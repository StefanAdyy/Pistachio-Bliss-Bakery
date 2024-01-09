import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent {

  orders!: Order[];
  constructor(orderService: OrderService, router: Router) {
    orderService.getCurrentUserOrders().subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    })

    //to do: 1) display the orders (use romainan), implement update, delete for orders. 
    //to do: 2) Update Read Delete pt conturi (la admin mai apare un buton si doar el poate face asta)
    //to do: 3) Aplicatie android
  }

  formatedDate(date: string): string {
    return date.slice(0, 10);
  }
}
