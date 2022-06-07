import { Router } from '@angular/router';
import { SearchRes } from './../../common/search-res';
import { ResponseNyckelSearch } from './../../common/response-nyckel-search';
import { ResponseNyckel } from './../../common/response-nyckel';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageNyckel } from 'src/app/common/image-nyckel';




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
  resultat : ResponseNyckel   ;
  resForSearch : any [];
  res : SearchRes [] ;
  myImageFromSearchGalery : ImageNyckel ;
  

  

  constructor(private formBuilder: FormBuilder,
              private productService : ProductService,
              private router : Router ) { }

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
    this.productService.addProductNyckel(formData).subscribe(
      data => this.resultat = {
      labelName: (data as any).labelName,
      labelId:  (data as any).labelId,
      confidence:  (data as any).confidence
    });

  }

  searchWithNyckel(){

    const formData = new FormData();
    formData.append('image', this.updateFormGroup.get('updateProduct.image').value);
    
    this.productService.searchProductNyckel(formData).subscribe(
      data => {
        this.resForSearch= data
     
        this.res = data.searchSamples ;
        console.log(JSON.stringify(this.resForSearch));
        
        console.log('Contents of the resultat :');
      for(let tempRes of this.res){
        console.log(
          `sampleId : ${tempRes.sampleId} , distance : ${tempRes.distance} `
        )
        this.productService.getImageOfNyckelSearch(tempRes.sampleId).subscribe(
          data =>{
            this.myImageFromSearchGalery = data ;
            console.log('data of search : ')
            console.log(this.myImageFromSearchGalery);
            
              console.log('--------------- Contents of the resultat --------------- :');
              console.log(
                `id  : ${this.myImageFromSearchGalery.id} , data : ${this.myImageFromSearchGalery.data} `
              )
              if(this.myImageFromSearchGalery){
                this.productService.getProductByRef(this.myImageFromSearchGalery.id).subscribe(
                  data => {
                    const p = data 
                    console.log('the product after search by Reference :')
                    console.log(p);
                    this.router.navigateByUrl("update-product/"+p.id);
                  }
                )
                
                this.productService.getProductFromImagesByRef(this.myImageFromSearchGalery.id).subscribe(
                  data => {
                    const pd = data 
                    console.log('the product after search by Reference :')
                    console.log(pd);
                    for(let i of pd){
                      console.log(i.product.id);
                      this.router.navigateByUrl("update-product/"+i.product.id);
                    }
                    
                  }
                )
              }   
            }
            
        )
      }
      }
    )

  }

  classifier(){
    if(this.resultat && this.resultat.confidence < 0.70){

      return false ;
    }else{
      return true ;
    }
  }

  productExist(){
    if(this.res){
      for(let tempRes of this.res){
        if(tempRes.distance > 0.30){
          return false ;
        }else{
          return true ;
        }
      }
      
    }
  }
}




