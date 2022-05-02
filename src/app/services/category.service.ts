import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl = 'http://127.0.0.1:8000/api/category'

  constructor(private httpClient : HttpClient) { }
  getCategoryList(): Observable<ProductCategory[]>{
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
  }
  consulterCategory(id: number): Observable<ProductCategory> {
    const url = `${this.categoryUrl}/${id}`;
    return this.httpClient.get<ProductCategory>(url);
  }
  addCategory(cat: ProductCategory): Observable<ProductCategory> {
    const url = `${this.categoryUrl}/create/`;
    return this.httpClient.post<ProductCategory>(url,cat);
  }
  updateCategory(cat: ProductCategory): Observable<ProductCategory> {
    const url = `${this.categoryUrl}/update/${cat.id}`;
    return this.httpClient.put<ProductCategory>(url,cat);
  }
  deleteCategory(id: number) {
    const url = `${this.categoryUrl}/delete/${id}`;
    return this.httpClient.delete(url);
  }
}
