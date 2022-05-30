import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categoryCount :  any ;
  productCount : any ; 
  customersCount : any ;
  BillsCount : any ; 

  constructor(private dashBoardService : DashboardService) { }

  ngOnInit(): void {

    this.dashBoardService.getBillsCount().subscribe(
      data =>{
        this.BillsCount = data.count 
        console.log(this.BillsCount);
      }
    )
    this.dashBoardService.getCategoryCount().subscribe(
      data =>{
        this.categoryCount = data.count 
        console.log(this.categoryCount);
      }
    )

    this.dashBoardService.getProductsCount().subscribe(
      data =>{
        this.productCount = data.count
        console.log(this.productCount);
      }
    )

    this.dashBoardService.getCustomersCount().subscribe(
      data =>{
        this.customersCount = data.count
        console.log(this.customersCount);
      }
    )


  }

}
