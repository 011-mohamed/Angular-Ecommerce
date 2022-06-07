import { ResponseNyckelSearch } from './../common/response-nyckel-search';
import { SearchRes } from './../common/search-res';
import { ProductCategory } from './../common/product-category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { ImagesProduct } from '../common/images-product';
import { ImageNyckel } from '../common/image-nyckel';
import { HttpHeaders } from '@angular/common/http';


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
    const url = `https://www.nyckel.com/v1/functions/7aaigszss2ejx7t8/invoke`;

    return this.httpClient.post(url,formData);
  }

  searchProductNyckel(formData: FormData):Observable<any>{
    const url = `https://www.nyckel.com/v0.9/functions/1wx5f24y974e1ntc/search`;

    return this.httpClient.post<any[]>(url,formData);
  }

  getProductsListSorted(): Observable<Product[]>{
    const sortProd=`${this.baseUrl}/orderByDate`
    return this.httpClient.get<Product[]>(sortProd);
  }

  getImagesProduct(): Observable<ImagesProduct[]>{
    const url=`http://127.0.0.1:8000/api/imagesProduct/`
    return this.httpClient.get<ImagesProduct[]>(url); 
  }

  getImagesProductFiltredById(id: number): Observable<ImagesProduct[]>{
    const url=`http://127.0.0.1:8000/api/imagesProduct/findByProduct/${id}`
    return this.httpClient.get<ImagesProduct[]>(url); 
  }

  getImageOfNyckelSearch(sampleId : string):Observable<ImageNyckel>{
    const url = `https://www.nyckel.com/v1/functions/1wx5f24y974e1ntc/samples/${sampleId}`
    const headers= new HttpHeaders()
      .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2NTQ1Njc0NTcsImV4cCI6MTY1NDU3MTA1NywiaXNzIjoiaHR0cHM6Ly93d3cubnlja2VsLmNvbSIsImNsaWVudF9pZCI6ImFycHF1aGV4MXppczIwbnl4ZTk0ZGR4a2ViczRjemthIiwianRpIjoiN0NGQzkxRDNBMEVEQTY5NjY2MkFBNjM0N0ZDMTk3NTkiLCJpYXQiOjE2NTQ1Njc0NTcsInNjb3BlIjpbImFwaSJdfQ.CAZO22j2SBEh3sEY7MawvQwl7uVnDAO4FCQdjaefLYZ3I7VFZvsrqH8O7yUfz8Qvp9h6zXSG8FDjCXKp9zh6T81bbcc3RCJVTFN7N97Tz22mk2AqAIvIQUhqQ8k_Ti9v7qKyqU8HFF9Q858lOcPHTW75ZsYPBLc4Y_K9ECUqAas_xQNQiVAv7GUku03L7aO9dZMOh0SJebk2q4b5ib8jKmdsDTYGQKJIirB8x3lAbrxCCPwjfhBgK6KnljRrDJxXhijEBnfpMp1NVCjHZ8D18sm5jfP-UXyxOh3_x5JXp73FBjRLx9M1hVqaT_rxhtGjRqiiK4-reF1xQni0jCv3bQ')  
      
    return this.httpClient.get<ImageNyckel>(url,{'headers':headers}); 
  } 

  getProductByRef(sid : string ):Observable<Product> {
    const productUrl = `${this.baseUrl}/getProductByRef/${sid}`;
    return this.httpClient.get<Product>(productUrl)  
  }

  getProductFromImagesByRef(ref : string ): Observable<ImagesProduct[]>{
    const url = `http://127.0.0.1:8000/api/imagesProduct/findByReference/${ref}`
    return this.httpClient.get<ImagesProduct[]>(url)  ;
  }
  
}

