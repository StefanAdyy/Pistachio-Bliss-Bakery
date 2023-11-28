import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'pay-button',
  templateUrl: './pay-button.component.html',
  styleUrls: ['./pay-button.component.css']
})
export class PayButtonComponent {

  @Input()
  order!: Order;


}
