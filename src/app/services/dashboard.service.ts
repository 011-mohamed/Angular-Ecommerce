import { Statistic } from './../common/statistic';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrlDashboard = "http://127.0.0.1:8000/api"

  constructor(private httpClient : HttpClient) { }

  getProductsCount(){
    const productUrl = `${this.baseUrlDashboard}/product/count`
    return this.httpClient.get<any>(productUrl);
  }
  
  getCategoryCount(){
    const categorytUrl = `${this.baseUrlDashboard}/category/categoryCount`
    return this.httpClient.get<any>(categorytUrl);
  }

  
  getCustomersCount(){
    const customersUrl = `${this.baseUrlDashboard}/customers/customersCount`
    return this.httpClient.get<any>(customersUrl);
  }

   
  getBillsCount(){
    const billsUrl = `${this.baseUrlDashboard}/bills/billsCount`
    return this.httpClient.get<any>(billsUrl);
  }

  getSumOfSalesPerMonth(){
    const sumUrl = `http://127.0.0.1:8000/api/bills/sumPerMonth`
    return this.httpClient.get<Statistic[]>(sumUrl);
  }

  getProductWithLowQty():Observable<Product[]>{
    const url = `http://127.0.0.1:8000/api/product/getProductWithLowqty`
    return this.httpClient.get<Product[]>(url);
  }
}
