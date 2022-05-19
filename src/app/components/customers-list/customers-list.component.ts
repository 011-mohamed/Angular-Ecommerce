import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  customers : Customer[];

  constructor(private customerService: CustomerService ,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
      this.listCustomers();
    });
  }
    listCustomers() {
    this.handleListCustomers(); 
    }

    handleListCustomers(){

     this.customerService.getCustomerList().subscribe(
       data => {
         this.customers = data ;
       }
     )
    }
    deleteCustomer(customer: Customer) {

      let conf = confirm('Etes-vous sûr de supprimer '+customer.firstName+' ?');
      if (conf)
        this.customerService.deleteCustomer(customer.id).subscribe(() => {
          console.log('Customer deleted');
          this.SuprimerCustomerDuTableau(customer);
        });
    }
    SuprimerCustomerDuTableau(customer : Customer) {
      this.customers.forEach((cur, index) => {
        if(customer.id=== cur.id) {
          this.customers.splice(index, 1);
        }
      });
    }
  
    doSearch(value: any){
      
  
      if(isNaN(value)){
        this.customerService.getCustomersByName(value).subscribe(
          data => {
            this.customers = data ;
          }
        );
      }else{
        this.customerService.getCustomersByPhoneNumber(value).subscribe(
          data => {
            this.customers = data ;
          }
        );
      }
    }
    doSortDEC(){
    
      this.customerService.getCustomersListSorted().subscribe(
        data => {
          this.customers = data ;
        }
      )
    }
  
    doSortCR(){
      this.customerService.getCustomerList().subscribe(
        data => {
          this.customers = data ;
        }
      )
    }

}
