import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice : number = 0  ;
  totalQuantity : number = 0 ;
  cartItems : CartItem [] = [] ;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {

    this.updateCartStatus();
  }


  updateCartStatus() {
    // subscribe to the cart totalPrice and quantity 
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data 
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data 
    );

    this.cartItems = this.cartService.cartItems ;
     
  }

}
