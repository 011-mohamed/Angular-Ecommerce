import { Product } from './product';
export class CartItem {

    id: number ; 
    name : string ;
    unitPrice : number ;
    quantity :number  ;
    image : string;
    unitStock : number ;
    
    constructor(product : Product ,  qt: number){
        this.id = product.id ;
        this.name = product.name ;
        this.unitPrice = product.unitPrice ;
        this.image = product.image ;
        this.quantity = qt | 0 ;
        this.unitStock = product.unitStock ;
    }

    
}
