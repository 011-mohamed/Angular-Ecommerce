import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem[] = []; 

  totalPrice : Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity : Subject<number> = new BehaviorSubject<number>(0);

  
  
  constructor() { }

  addToCart(theCartItem : CartItem ){

    // check if we already have the item in our cart 

    let alreadyExistsInCart : boolean = false ;
    let existingCartItem : CartItem = undefined ;

    if(this.cartItems.length >0){
      // find the item in the cart based on item id 
      
      existingCartItem = this.cartItems.find(
        tempCartItem => tempCartItem.id === theCartItem.id
      );

        
      alreadyExistsInCart = (existingCartItem != undefined) ;
    }
    // check if we found it 

    

    if(alreadyExistsInCart){
      let Rule : number = existingCartItem.quantity + theCartItem.quantity 
      if(Rule >theCartItem.unitStock ){
        

      }else{
          existingCartItem.quantity += theCartItem.quantity ;
      }
    }else{
    
    this.cartItems.push(theCartItem);
  }

    // compute cart total price and qty
    this.computeCartTotals();
  }

  computeCartTotals() {
    
    let totalPriceValue : number = 0 ;
    let totalQuantityValue : number = 0 ;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice ;
      totalQuantityValue += currentCartItem.quantity
    }
    // publish the new values .. all subscribers will recieve the new data 
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for debugging purpose 
    this.logCartData(totalPriceValue,totalQuantityValue);

    
     
  }
  

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart :');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice ;
      console.log(
        `name : ${tempCartItem.name} , qunatity : ${tempCartItem.quantity} , unitPrice : ${tempCartItem.unitPrice} , subtotal : ${subTotalPrice}`
      )

      console.log(`totalPrice: ${totalPriceValue.toFixed(3)} , totalQuantity : ${totalQuantityValue}`);
      console.log(`---------------`)
    }
  }

  addtoCartDetails(theCartItem : CartItem){
    // check if we already have the item in our cart 

    let alreadyExistsInCart : boolean = false ;
    let existingCartItem : CartItem = undefined ;

    if(this.cartItems.length >0){
      // find the item in the cart based on item id 
      
      existingCartItem = this.cartItems.find(
        tempCartItem => tempCartItem.id === theCartItem.id
      );

        
      alreadyExistsInCart = (existingCartItem != undefined) ;
    }
    // check if we found it 

    

    if(alreadyExistsInCart){
      //increment the quantity

      existingCartItem.quantity ++ ;

    }

    // compute cart total price and total quantity 

    this.computeCartTotals();

  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity -- ;
    if(theCartItem.quantity === 0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    
    // get index of item in the array 
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id) ;
    
    // if found , remove the item from the array at the given index 
    if (itemIndex > -1 ){
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }

  

}

/*
    // check if we already have the item in our cart 
    let alreadyExistsInCart: boolean =false ;
    let existingCartItem : CartItem = undefined ;

    if (this.cartItems.length > 0){
      // find the item in the cart based on item id 
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id){
          existingCartItem = tempCartItem ;
          break ;
        }
      }
      // check if we found it 
      alreadyExistsInCart = (existingCartItem !=undefined)
    }
    
    if (alreadyExistsInCart){
      // increment qt 
      existingCartItem.quantity ++ ;
    }else{
      // just add the item to the array 
      this.cartItems.push(theCartItem);
}
*/