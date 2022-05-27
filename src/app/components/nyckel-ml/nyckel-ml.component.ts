import { ResponseNyckelSearch } from './../../common/response-nyckel-search';
import { ResponseNyckel } from './../../common/response-nyckel';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-nyckel-ml',
  templateUrl: './nyckel-ml.component.html',
  styleUrls: ['./nyckel-ml.component.css']
})
export class NyckelMlComponent implements OnInit {
  updateFormGroup : FormGroup ;
  files: File[] = [];
  filePath: string ;
  imageName : string = 'select image ...';
  srcImg : string =''
  resultat : ResponseNyckel = null   ;
  resForSearch : any ;
  constructor(private formBuilder: FormBuilder,
              private productService : ProductService ) { }

  ngOnInit(): void {
    this.updateFormGroup = this.formBuilder.group({
      updateProduct : this.formBuilder.group({
        image : ['']
      })
    });
  }

  onChange(event) {
    
    const file = event.target.files[0];
    this.updateFormGroup.get('updateProduct.image').setValue(file);
    console.log(this.updateFormGroup.get('updateProduct.image').value.name)
    this.imageName = this.updateFormGroup.get('updateProduct.image').value.name ;
    this.srcImg = 'http://127.0.0.1:8000/media/images/'+this.imageName
  
  }
  onSubmit(){
    
    console.log(this.updateFormGroup.get('updateProduct.image').value)
    const formData = new FormData();
    formData.append('image', this.updateFormGroup.get('updateProduct.image').value);
    /*this.productService.addProductNyckel(formData).subscribe(
      data => this.resultat = {
      labelName: (data as any).labelName,
      labelId:  (data as any).labelId,
      confidence:  (data as any).confidence
    });*/

    this.productService.searchProductNyckel(formData).subscribe(
      data => {
        console.log('result ='+ JSON.stringify(data)+'***********\n' );
      }  
    )
  }
}




