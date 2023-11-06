import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUSerFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bine ai venit la noi, ${user.name}!`,
            'Login realizat cu succes!'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Nu te-ai putut conecta!');
        }
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bine ai venit,  ${user.name}!`,
            `Contul a fost creat cu succes!`
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            `Înregistrarea a eșuat!`)
        }
      })
    )
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload(); // facem reload ca atunci cand esti pe o pagina unde e necesar un cont (Cos) sa nu ramana acolo 
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUSerFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);

    if (userJson) {
      return JSON.parse(userJson) as User;
    }

    return new User();
  }
}
