import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ProductoCarrito } from '../models/productoCarrito';

@Injectable()
export class ProductosCarritoService {

  productosCarrito: ProductoCarrito[];

  productosCarritoList: AngularFireList<ProductoCarrito>;
  selectedProductoCarrito: ProductoCarrito = new ProductoCarrito();

  constructor(private firabasebd: AngularFireDatabase) {
    this.productosCarrito = [];
   }

/*   getProductosCarritoList(){
    return this.productosCarritoList = this.firabasebd.list('productosCarritos');
  } */

  getProductosCarritoList(): ProductoCarrito[] {
    if(localStorage.getItem('productosCarrito') === null) {
      this.productosCarrito = [];
    } else {
      this.productosCarrito = JSON.parse(localStorage.getItem('productosCarrito'));
    }
    return this.productosCarrito;
  }

  addProductoCarritoList(productoCarrito: ProductoCarrito){
    this.productosCarrito.unshift(productoCarrito);//Lo agrega al inicio
    let productosCarrito;
    if(localStorage.getItem('productosCarrito') === null ) {
      productosCarrito = [];
      productosCarrito.unshift(ProductoCarrito)
      localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
    } else {
      productosCarrito = JSON.parse(localStorage.getItem('productosCarrito'));
      productosCarrito.unshift(productoCarrito);
      localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
    }
  }
/*   addProductosCaritoList(productoCarrito: ProductoCarrito){
    //this.productosCarritoList.push(productoCarrito)
    this.productosCarritoList.push({
      $key:productoCarrito.$key,//deber[ía ser sin key]
      name: productoCarrito.name,
      quantity: productoCarrito.quantity,
      price: productoCarrito.price
    })
  } */

  removeProductosCaritoList(productoCarrito: ProductoCarrito){
    for (let i = 0; this.productosCarrito; i++){
      if(productoCarrito == this.productosCarrito[i]){
        this.productosCarrito.splice(i, 1);
      }
      localStorage.setItem('productosCarrito', JSON.stringify(this.productosCarrito));
    }
  }
  
  updateProductosCarritoList(productoCarrito: ProductoCarrito){
    this.productosCarritoList.update(productoCarrito.$key, {
      $key:productoCarrito.$key,
      name: productoCarrito.name,
      quantity: productoCarrito.quantity,//debería ser sólo quantity
      price: productoCarrito.price
    });
  }

/*   removeProductosCarritoList($key: string){
    this.productosCarritoList.remove($key);
  } */
}
