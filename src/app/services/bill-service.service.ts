import { Bill } from './../common/bill';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillServiceService {
  
  private purchaseUrl = 'http://127.0.0.1:8000/api/bills/create/'
  private billseUrl = 'http://127.0.0.1:8000/api/bills'

  constructor(private httpClient : HttpClient) { }

  placeBill(bill : Bill): Observable<any>{
    return this.httpClient.post<Bill>(this.purchaseUrl,bill)
  }
  
  getBillsList(): Observable<Bill[]>{
    return this.httpClient.get<Bill[]>(this.billseUrl);
  }

  searchBillsByName(theKeyword: string): Observable<Bill[]> {

    // need to build URL base name keyword
    const searchUrl= `${this.billseUrl}/search/${theKeyword}`;
     
   return this.httpClient.get<Bill[]>(searchUrl);
 }

  searchBillsByPhoneNumber(theKeyword: Number): Observable<Bill[]> {

  // need to build URL base name keyword
  const searchUrl= `${this.billseUrl}/searchByPhone/${theKeyword}`;
   
  return this.httpClient.get<Bill[]>(searchUrl);
  
  }

  getBillsListSorted(): Observable<Bill[]>{
    const sortBills=`${this.billseUrl}/order`
    return this.httpClient.get<Bill[]>(sortBills);
  }

}
