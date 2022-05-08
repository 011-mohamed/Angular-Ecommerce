import { Customer } from 'src/app/common/customer';
import { Purchase } from './../../common/purchase';
import { OrderItem } from './../../common/order-item';
import { Router } from '@angular/router';
import { CheckoutService } from './../../services/checkout.service';
import { CartService } from './../../services/cart.service';
import { ShopShopValidators } from './../../validators/shop-shop-validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from 'src/app/common/order';
import { CustomerService } from 'src/app/services/customer.service';
import { isNull } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  customerTel : number    ;
  checkoutFormGroup: FormGroup ;
  customers : Customer[];
  totalPrice : number = 0 ;
  totalQuantity : number = 0 ;
  orderTrackingNumber : any = 0 ;
  custmerFromDB: Customer = new Customer() ;
  constructor(private formBuilder:FormBuilder,
              private cartService: CartService,
              private checkoutService:CheckoutService,
              private customerService : CustomerService,
              private router:Router) { }

  ngOnInit(): void {
    this.customerService.getCustomerList().subscribe(
      data => {
        this.customers = data ;
      }
    );
      

    this.reviewCartDetails();
    this.checkoutFormGroup = this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName :new FormControl('',[
                                        Validators.minLength(2),
                                        Validators.pattern('[a-zA-Z]*'),
                                        ShopShopValidators.notOnlyWhitespace]),
        lastName:new FormControl('',[
                                  Validators.minLength(2),
                                  Validators.pattern('[a-zA-Z]*'),
                                  ShopShopValidators.notOnlyWhitespace]),
        phoneNumber:new FormControl('',[
                                    Validators.pattern('[0-9]{8}'),
                                    ShopShopValidators.notOnlyWhitespace]),
        company:new FormControl('',[
                                    Validators.minLength(2),
                                    ShopShopValidators.notOnlyWhitespace])  
      })
    });
    
  }

  async onChange(){
      
        this.customerService.getCustomerByPhoneNumber(this.customerTel).subscribe(
          response =>{
            this.custmerFromDB  =  response;
          }
        );
        console.log(`customer Phone Number : ${this.customerTel}`);
        console.log(this.custmerFromDB.firstName);
      
      
  }
  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice 
    );
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity 
    );
  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName(){return this.checkoutFormGroup.get('customer.lastName'); }  
  get phoneNumber(){return this.checkoutFormGroup.get('customer.phoneNumber'); }
  get company(){return this.checkoutFormGroup.get('customer.company'); }
  
  onSubmit(){
    console.log("handling the submit button :");
    console.log(this.checkoutFormGroup.get('customer').value) ;
    
    // set up order 
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    //get cart items
    const cartItems = this.cartService.cartItems ;

    // create order items from cart items
    let orderItems : OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
    // set up purchase 
    let purchase = new Purchase();
    // populate purchase 
    if(this.customerTel == null){
      purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    }else{
      purchase.customer = this.custmerFromDB ;
    }
    console.log(this.custmerFromDB.firstName);
    purchase.order = order ;
    purchase.orderItems = orderItems;

    console.log(`purchase : ${purchase.customer.firstName} +  ${purchase.order.totalPrice} }`);
    
    // call REST Api via checkout service 
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response =>{
          
          alert(`Your order has been recieved \n Order tracking number: ${response.orderTrackingNumber}`);
          purchase.orderTrackingNum = response.orderTrackingNumber
          //resset cart
          this.router.navigateByUrl("/bill", { state: purchase});
          this.resetCart();
        },
        error: err=> {
          alert(`There was an error:${err.message}`);
        }
      } 
    );
  }

  resetCart() {
    // reset cart data 
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    // reset the form 
    this.checkoutFormGroup.reset();
    
  }

}
