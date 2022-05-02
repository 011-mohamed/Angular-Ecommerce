import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  currentCategory = new ProductCategory() ;

  constructor(private activatedRoute: ActivatedRoute,
     private categoryService : CategoryService,
     private router :Router) { }

  ngOnInit(): void {
    this.categoryService.consulterCategory(this.activatedRoute.snapshot.params['id']).
    subscribe( cat =>{ this.currentCategory = cat;
       } ) ;
  }

  updateCategory() {
    this.categoryService.updateCategory(this.currentCategory).subscribe(cat => {
    this.router.navigate(['categories']);
    console.log('Category updated');
    },(error) => { alert("Problème lors de la modification !"); }
    );
    }

}
