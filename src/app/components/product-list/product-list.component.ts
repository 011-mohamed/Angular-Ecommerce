import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Product } from './../../common/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  

  products : Product[];
  currentCategoryId: number ;
  searchMode : boolean ;
  Quantity : number = 0 ;

  constructor(private productService : ProductService,
              private route: ActivatedRoute,
              private cartService : CartService  ) { }          


  

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
      this.listProducts();
    });

    
    
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
    
   
  }
  handleListProducts(){

     // check if id parameter is available 
     const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');

     if(hasCategoryId){
       // get the 'id' param string , convert into a number with + 
       this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
       // now get the product for the given id 
        this.productService.getProductListByCategory(this.currentCategoryId).subscribe(
       data => {
         this.products = data ;
       }
     )

     }else{
      this.productService.getProductList().subscribe(
        data => {
          this.products = data ;
        }
      )
     }
 
     
  }
  handleSearchProducts() {
     
    const theKeyword : string = this.route.snapshot.paramMap.get('keyword');
    // now search for products using keyword 
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data ;
      }
    );
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
