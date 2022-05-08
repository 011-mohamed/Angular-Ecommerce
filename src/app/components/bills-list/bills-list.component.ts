import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/common/bill';
import { BillServiceService } from 'src/app/services/bill-service.service';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.css']
})
export class BillsListComponent implements OnInit {
  bills : Bill[];

  constructor(private billService: BillServiceService ,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
      this.listBills();
      
    });
  }
  listBills() {
    this.handleListBills(); 
  }


  handleListBills(){

    this.billService.getBillsList().subscribe(
      data => {
        console.log('Bills ='+ JSON.stringify(data)+'***********\n' );
        this.bills = data ;
      }
    )
  }

  
  doSearch(value: any){
    console.log(`value+${value}`);

    if(isNaN(value)){
      this.billService.searchBillsByName(value).subscribe(
        data => {
          this.bills = data ;
        }
      );
    }else{
      this.billService.searchBillsByPhoneNumber(value).subscribe(
        data => {
          this.bills = data ;
        }
      );
    }
  }
  doSortDEC(){
  
    this.billService.getBillsListSorted().subscribe(
      data => {
        this.bills = data ;
      }
    )
  }

  doSortCR(){
    this.billService.getBillsList().subscribe(
      data => {
        this.bills = data ;
      }
    )
  }

}
