import { CartItem } from "./CartItem";

export class Order {
    id!: number;
    items!: CartItem[];
    totalPrice!: number;
    name!: string;
    address!: string;
    paymenId!: string;
    createdAt!: string;
    status!: string;
}