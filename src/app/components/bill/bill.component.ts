import { CartService } from './../../services/cart.service';
import { Bill } from './../../common/bill';
import { OrderItem } from './../../common/order-item';
import { Order } from './../../common/order';
import { Purchase } from './../../common/purchase';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { DatePipe } from '@angular/common';
import { BillServiceService } from 'src/app/services/bill-service.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  purchase:Purchase ; 
  order : Order ;
  orderItems : OrderItem[] ;
  customer : Customer ;
  currentDateTime : any ;
  idBill : any
  totalP : any ;
  totalQ : any ;
  bill : Bill ;
  orderID : any ;
  constructor(private router:Router,
              private billService:BillServiceService,
              public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.purchase=history.state;
    console.log(this.purchase)
    this.order = this.purchase.order ;
    this.orderItems = this.purchase.orderItems ;
    this.customer = this.purchase.customer ;
    this.currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.idBill = this.randomString(10) ;
    this.totalP = this.order.totalPrice ;
    this.totalQ = this.order.totalQuantity ;
    this.orderID = this.purchase.orderTrackingNum ;
    
    // populate invoice-Details-print
    this.bill = new Bill(this.purchase,this.currentDateTime,this.idBill) ;
  }

  randomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  handlePrint(){
    window.print();
    // navigate to the products page
  }

  onSubmit(){
    this.billService.placeBill(this.bill).subscribe(
      {
        next: response =>{
          
          alert(`Your Bill has been recieved \n BILL TRACKING ID : ${this.bill.billId}`);
          
          //resset cart
          this.router.navigateByUrl("/products");
          
        },
        error: err=> {
          alert(`There was an error:${err.message}`);
        }
      } 
    );

  }

  
  

}
