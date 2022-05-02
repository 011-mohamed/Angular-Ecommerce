import { Order } from './order';
import { Customer } from './customer';
import { OrderItem } from './order-item';
export class Purchase {

    customer : Customer ;
    order : Order ;
    orderItems : OrderItem[];
    orderTrackingNum : any = null ;
}
