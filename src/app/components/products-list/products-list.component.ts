import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

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
  deleteProduct(prod: Product) {

    let conf = confirm('Etes-vous sûr de supprimer '+prod.name+' ?');
    if (conf)
      this.productService.deleteProduct(prod.id).subscribe(() => {
        console.log('Product deleted');
        this.SuprimerProduitDuTableau(prod);
      });
}
  SuprimerProduitDuTableau(prod : Product) {
    this.products.forEach((cur, index) => {
      if(prod.id=== cur.id) {
        this.products.splice(index, 1);
      }
});
}

  
  

}
