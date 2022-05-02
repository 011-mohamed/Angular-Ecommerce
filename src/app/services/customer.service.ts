import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../common/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerUrl = 'http://127.0.0.1:8000/api/customers'

  constructor(private httpClient : HttpClient) { }
  getCustomerList(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(this.customerUrl);
  }
  consulterCustomer(id: number): Observable<Customer> {
    const url = `${this.customerUrl}/${id}`;
    return this.httpClient.get<Customer>(url);
  }
  updateCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.customerUrl}/update/${customer.id}`;
    return this.httpClient.put<Customer>(url,customer);
  }
  deleteCustomer(id: number) {
    const url = `${this.customerUrl}/delete/${id}`;
    return this.httpClient.delete(url);
  }
}
