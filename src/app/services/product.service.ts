import { ProductCategory } from './../common/product-category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
  

  private baseUrl  = 'http://127.0.0.1:8000/api/product' ;

  private categoryUrl = 'http://127.0.0.1:8000/api/category'

  constructor( private httpClient : HttpClient) { }

  getProductList(): Observable<Product[]>{

    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  getProductListByCategory(theCategoryId : number): Observable<Product[]>{

    // need to build URL base on category ID 
    const searchUrl= `${this.baseUrl}/findByCategory/${theCategoryId}`;

    return this.httpClient.get<Product[]>(searchUrl);
  }
  
  getProductCategories():Observable<ProductCategory[]> {
    
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
    
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

     // need to build URL base name keyword
     const searchUrl= `${this.baseUrl}/search/${theKeyword}`;
      
    return this.httpClient.get<Product[]>(searchUrl);
  }
  
  getProduct(theProductId: number):Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl)  
  }

  deleteProduct(id: number) {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.httpClient.delete(url);
  }

  consulterProduct(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(url);
  }

  updateProduct(formData: FormData, id : number): Observable<Product> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.httpClient.put<any>(url,formData);
  }

  addProduct(formData: FormData){
    const url = `${this.baseUrl}/add`;
    return this.httpClient.post(url,formData);
  }

  addProductNyckel(formData: FormData){
    const url = `https://www.nyckel.com/v1/functions/7aaigszss2ejx7t8/invoke`
    return this.httpClient.post(url,formData);
  }

  searchProductNyckel(formData: FormData){
    const url = `https://www.nyckel.com/v0.9/functions/xp8al1tiuac12kj9/search`
    return this.httpClient.post(url,formData);
  }

  getProductsListSorted(): Observable<Product[]>{
    const sortProd=`${this.baseUrl}/orderByDate`
    return this.httpClient.get<Product[]>(sortProd);
  }

  
}
