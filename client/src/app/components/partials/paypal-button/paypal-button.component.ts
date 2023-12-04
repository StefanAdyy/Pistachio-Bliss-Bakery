import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit {

  @Input()
  order!: Order;

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  constructor(private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'EUR',
                  value: (self.order.totalPrice / 4.97).toFixed(2),
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          self.orderService.pay(this.order).subscribe(
            {
              next: (orderId) => {
                this.cartService.clearCart();
                this.router.navigateByUrl('/track/' + orderId);
                this.toastrService.success(
                  'Plata s-a efectuat cu succes',
                );
              },
              error: (error) => {
                this.toastrService.error('Plata nu s-a putut salva');
              }
            }
          );
        },

        onError: (err: any) => {
          this.toastrService.error('Plata nu s-a putut efectua');
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);

  }
}
