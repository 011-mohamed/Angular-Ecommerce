import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  currentCustomer = new Customer() ;

  constructor(private activatedRoute: ActivatedRoute,
    private customerService : CustomerService,
    private router :Router) { }

  ngOnInit(): void {
    this.customerService.consulterCustomer(this.activatedRoute.snapshot.params['id']).
    subscribe( Customer =>{ this.currentCustomer = Customer;
       } ) ;
  }

  updateCustomer() {
    this.customerService.updateCustomer(this.currentCustomer).subscribe(Customer => {
    this.router.navigate(['customers']);
    console.log('Customer updated');
    },(error) => { alert("Problème lors de la modification !"); }
    );
    }

}
