import { CartItem } from 'src/app/common/cart-item';
export class OrderItem {
    product : number ;
    qty : number ;
    price : number ;
    name : string ;
    
    constructor (cartItem : CartItem){
        this.qty = cartItem.quantity ;
        this.price = cartItem.unitPrice ;
        this.product = cartItem.id ;
        this.name = cartItem.name;
    }
}
