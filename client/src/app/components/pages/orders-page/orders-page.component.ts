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
  }
}
