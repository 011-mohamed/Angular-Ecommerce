import { Purchase } from './../common/purchase';
import { OrderItem } from './../common/order-item';
import { Order } from './../common/order';
import { Customer } from './../common/customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://127.0.0.1:8000/api/order/add/'

  constructor(private httpClient : HttpClient) { }

  placeOrder(purchase:Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl,purchase)
  }
}
