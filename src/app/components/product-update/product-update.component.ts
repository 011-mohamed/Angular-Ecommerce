import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  currentProduct = new Product() ;
  categories : ProductCategory[];
  updateFormGroup : FormGroup ;
  idProduct : number ;
  imageName : string ='';

  constructor(private activatedRoute: ActivatedRoute,
    private productService : ProductService,
    private categoryService : CategoryService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    
    this.idProduct = this.activatedRoute.snapshot.params['id'] ;
    this.productService.consulterProduct(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentProduct = prod; 
      } ) ;
      this.activatedRoute.paramMap.subscribe(()=> {
        this.handleListCategories();
      });


    this.updateFormGroup = this.formBuilder.group({
      updateProduct : this.formBuilder.group({
        name:[''],
        unitPrice : [''],
        unitStock : [''],
        image : [''],
        categorie : ['']
      })
    });
  }
  onChange(event) {
    
      const file = event.target.files[0];
      this.updateFormGroup.get('updateProduct.image').setValue(file);
      this.imageName = this.updateFormGroup.get('updateProduct.image').value.name ;
    console.log(this.updateFormGroup.get('updateProduct.image').value.name);
  }

  onSubmit(){
    console.log("handling the submit button ");
    console.log(this.updateFormGroup.get('updateProduct').value);
    console.log(this.updateFormGroup.get('updateProduct.image').value)

    const formData = new FormData();
    formData.append('name', this.updateFormGroup.get('updateProduct.name').value);
    formData.append('unitPrice', this.updateFormGroup.get('updateProduct.unitPrice').value);
    formData.append('unitStock', this.updateFormGroup.get('updateProduct.unitStock').value);
    formData.append('image', this.updateFormGroup.get('updateProduct.image').value);
    formData.append('categorie', this.updateFormGroup.get('updateProduct.categorie').value);

    this.productService.updateProduct(formData, this.idProduct).subscribe(
      {
        next:response =>{
          alert(`Your Product has been updated .\n`)
          this.router.navigateByUrl("/products");
          
        },
        error:err =>{
          alert(`There was an error :${err.message}`);
        }
      }
    );

    
  }
 
  handleListCategories(){

     this.categoryService.getCategoryList().subscribe(
       data => {
         this.categories = data ;
       }
     )
  }

}

