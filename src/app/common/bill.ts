import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";
import { Purchase } from "./purchase";

export class Bill {

    billId : any
    order : Order ;
    orderItems : OrderItem[] ;
    customer : Customer ;
    currentDateTime : any ;
    orderTN : any = null ;
    

    constructor(purchase:Purchase,curDate : any,id:any ){
        this.order = purchase.order;
        this.orderItems = purchase.orderItems ;
        this.customer = purchase.customer ;
        this.currentDateTime = curDate ;
        this.billId = id;
        this.orderTN = purchase.orderTrackingNum ;
        
      
     
    }
}
