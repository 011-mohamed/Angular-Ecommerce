import { Product } from 'src/app/common/product';
import { Component, OnInit } from '@angular/core'; 
import {  FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ShopShopValidators } from 'src/app/validators/shop-shop-validators';
import { CategoryService } from 'src/app/services/category.service';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  addProductFormGroup: FormGroup ;
  categories : ProductCategory[];

  constructor(private formBuilder:FormBuilder,
              private categoryService : CategoryService,
              private productService : ProductService,
              private router: Router) { }

  ngOnInit(): void {

    this.categoryService.getCategoryList().subscribe(
      data => {
        this.categories = data ;
      }
    )

    this.addProductFormGroup  = this.formBuilder.group({
      product : this.formBuilder.group({
        name: new FormControl('',[
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*'),
          ShopShopValidators.notOnlyWhitespace
        ]),
        description : new FormControl('',[
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*'),
          ShopShopValidators.notOnlyWhitespace
        ]),
        unitPrice:  new FormControl('',[
          Validators.required,
          ShopShopValidators.notOnlyWhitespace,
          Validators.pattern('[0-9]{1}\.[0-9]{3}$')
        ]),
        unitStock :  new FormControl('',[
          Validators.required,
          Validators.pattern('[0-9]*'),
          ShopShopValidators.notOnlyWhitespace
        ]),
        categorie : [''],
        image : [''], 
      }),
    });
  }

 
  onChange(event) {
    
    const file = event.target.files[0];
    this.addProductFormGroup.get('product.image').setValue(file);
  
  }
  onSubmit(){
    console.log(this.addProductFormGroup.get('product.name').value);
    console.log(this.addProductFormGroup.get('product.categorie').value);
    console.log(this.addProductFormGroup.get('product.image').value);
    console.log(this.addProductFormGroup.get('product.description').value);

    if(this.addProductFormGroup.invalid){
      this.addProductFormGroup.markAllAsTouched();
      return ;
    }
    

    const formData = new FormData();
    formData.append('name', this.addProductFormGroup.get('product.name').value);
    formData.append('description', this.addProductFormGroup.get('product.description').value);
    formData.append('unitPrice', this.addProductFormGroup.get('product.unitPrice').value);
    formData.append('unitStock', this.addProductFormGroup.get('product.unitStock').value);
    formData.append('categorie', this.addProductFormGroup.get('product.categorie').value);
    formData.append('image', this.addProductFormGroup.get('product.image').value);
    this.productService.addProduct(formData).subscribe(
      {
        next:response =>{
          alert(`Your Product has been added .\n`)
          this.router.navigateByUrl("/products");
          
        },
        error:err =>{
          alert(`There was an error :${err.message}`);
        }
      }
    );
  }
}
