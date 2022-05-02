import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';



@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  newCategory = new ProductCategory();

  constructor(private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService, 
    private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe(()=>{
      this.addCategory();
    });
  }
   
  
  addCategory() {
    this.categoryService.addCategory(this.newCategory).subscribe((cat) => {
      console.log(cat);
      this.router.navigate(['categories']);
    });
  }

}
