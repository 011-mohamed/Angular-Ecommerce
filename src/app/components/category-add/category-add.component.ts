import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';
import { ShopShopValidators } from 'src/app/validators/shop-shop-validators';



@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  name :string ='';
  description:string='' ;
  addCategoryFormGroup: FormGroup ;


  constructor(private formBuilder:FormBuilder,
              private categoryService: CategoryService, 
              private router: Router) { }

  ngOnInit(): void {
    this.addCategoryFormGroup = this.formBuilder.group({
      category : this.formBuilder.group({
        name: new FormControl('',[
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*'),
          ShopShopValidators.notOnlyWhitespace
        ]),
        description : new FormControl('',[
          Validators.required,
          Validators.minLength(2),
          ShopShopValidators.notOnlyWhitespace
        ]),
      })
    })
  }

  onSubmit(){
    if(this.addCategoryFormGroup.invalid){
      this.addCategoryFormGroup.markAllAsTouched();
      return ;
    }

    const formData = new FormData();
    formData.append('name', this.addCategoryFormGroup.get('category.name').value);
    formData.append('description', this.addCategoryFormGroup.get('category.description').value);
    
    this.categoryService.addCategory(formData).subscribe(
      {
        next:response =>{
          alert(`Your Category has been added .\n`)
          this.router.navigateByUrl("/categories");
          
        },
        error:err =>{
          alert(`There was an error :${err.message}`);
        }
      }
    );

  }
}
