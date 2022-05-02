import { Purchase } from './../../common/purchase';
import { OrderItem } from './../../common/order-item';
import { Router } from '@angular/router';
import { CheckoutService } from './../../services/checkout.service';
import { CartService } from './../../services/cart.service';
import { ShopShopValidators } from './../../validators/shop-shop-validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from 'src/app/common/order';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  checkoutFormGroup: FormGroup ;
  totalPrice : number = 0 ;
  totalQuantity : number = 0 ;
  orderTrackingNumber : any = 0 ;
  constructor(private formBuilder:FormBuilder,
              private cartService: CartService,
              private checkoutService:CheckoutService,
              private router:Router) { }

  ngOnInit(): void {

    this.reviewCartDetails();
    this.checkoutFormGroup = this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName :new FormControl('',[Validators.required,
                                        Validators.minLength(2),
                                        ShopShopValidators.notOnlyWhitespace]),
        lastName:new FormControl('',[Validators.required,
                                  Validators.minLength(2),
                                  ShopShopValidators.notOnlyWhitespace]),
        phoneNumber:new FormControl('',[Validators.required,
                                    Validators.pattern('[0-9]{8}'),
                                    ShopShopValidators.notOnlyWhitespace]),
        company:new FormControl('',[Validators.required,
                                    Validators.minLength(2),
                                    ShopShopValidators.notOnlyWhitespace])  
      })
    });
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
    
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return ;
    }
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
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
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
