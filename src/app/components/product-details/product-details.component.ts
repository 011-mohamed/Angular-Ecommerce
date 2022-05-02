import { CartItem } from './../../common/cart-item';
import { CartService } from './../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from './../../common/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product : Product = new Product () ;
  constructor(private productService : ProductService,
              private route : ActivatedRoute,
              private cartService : CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }

  handleProductDetails(): void {
    // get the id param string convert string to a number using the + symbol 
    const theProductId : number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data ;
      }
    )
    
  }
  cartResolved(theProduct : Product , theQuantity : number){
    
    if((this.quantitySuff(theProduct, theQuantity))|| (theQuantity == 0)){
      theQuantity = 0 ;
      theProduct = null ;
      
    }else{
      const theCartItem = new CartItem(theProduct , theQuantity);
      this.cartService.addToCart(theCartItem );
    }
  }
  

  addToCart(theProduct : Product , theQuantity : number){
    console.log(`Adding to cart :${theProduct.name},${theProduct.unitPrice}`);
    
    const theCartItem = new CartItem(theProduct , theQuantity);
    this.cartService.addToCart(theCartItem );
  }

  quantitySuff(theProduct : Product , theQuantity : number){
    
    if (theProduct.unitStock < theQuantity ) 
      return true ;
    
  }

  

}
