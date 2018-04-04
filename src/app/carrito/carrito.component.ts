import { Component, OnInit, isDevMode } from '@angular/core';
import { Http } from '@angular/http';

import { TiendaService } from '../services/tienda.service';
import { Sublevel } from '../models/sublevel';
import { Product } from '../models/product';

import { ProductosCarritoService } from '../services/productos-carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public generalOrderedCount: number = 0;
  ipAddress: string;
  productosCarrito: any = [];

  private total: number = 0;

  constructor(private productosCarritoService: ProductosCarritoService, private http: Http) { }

  ngOnInit() {
    this.getClientIpAdress();
    if(localStorage.getItem(`cartBaraton${this.ipAddress}`) != null){
      this.loadCart();
    }
  }


  //Función que carga la información de productos ordenados en el carrito de compras
  //almacenada en el local storage, y también para mostrar el número de artículos totales del
  //carrito en la barra de navegación
  loadCart(): void {
    this.total = 0;
    this.productosCarrito = [];
    let cart = JSON.parse(localStorage.getItem(`cartBaraton${this.ipAddress}`));
    for(var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.productosCarrito.push({
        id: item.id,
        name: item.name,
        price: item.price, 
        quantityOrdered: item.quantityOrdered
      })
      this.generalOrderedCount += item.quantityOrdered;
      this.total += parseInt(item.price.replace("$", "").replace(",", "")) * item.quantityOrdered;
    }
  }

  //Función que se encarga de agregar productos al carrito.
  //Hace uso del localStorage del navegador para dejar guardados los productos para la proxima
  //vez que se abra de nuevo es mismo navegador en determinado equipo
  addToCart(producto): void {
    if(localStorage.getItem(`cartBaraton${this.ipAddress}`) == null){
      let cart: any = [];
      producto.quantityOrdered = 1; 
      cart.push(JSON.stringify(producto));
      localStorage.setItem(`cartBaraton${this.ipAddress}`, JSON.stringify(cart));
    } else {
      let cart: any = JSON.parse(localStorage.getItem(`cartBaraton${this.ipAddress}`));
      let index: number = -1;
      for(var i = 0; i < cart.length; i++){
        let item: any = JSON.parse(cart[i])
        if(item.id == producto.id){
          index = i;
          break;
        }
      } 
      
      if(index == -1) {
        producto.quantityOrdered = 1; 
        cart.push(JSON.stringify(producto))
        localStorage.setItem(`cartBaraton${this.ipAddress}`, JSON.stringify(cart))
      } else {
        let item: any = JSON.parse(cart[index]);
        item.quantityOrdered += 1;
        cart[index] = JSON.stringify(item);
        localStorage.setItem(`cartBaraton${this.ipAddress}`, JSON.stringify(cart));
      }
    }
    this.generalOrderedCount++;
  }

  remove(id: string): void{
    let cart: any = JSON.parse(localStorage.getItem(`cartBaraton${this.ipAddress}`));
    let index: number = -1;
    for(var i = 0; i < cart.length; i++){
      let item: any = JSON.parse(cart[i])
      if(item.id == id){
        cart.splice(i,1);
        break;
      }
    } 
    localStorage.setItem(`cartBaraton${this.ipAddress}`, JSON.stringify(cart));
    this.generalOrderedCount = 0;
    this.loadCart();
  }

  quantityChange(newQ, id){

    let cart: any = JSON.parse(localStorage.getItem(`cartBaraton${this.ipAddress}`));
    let index: number = -1;
    for(var i = 0; i < cart.length; i++){
      let item: any = JSON.parse(cart[i])
      if(item.id == id){
        item.quantityOrdered = +newQ;
        cart[i] = JSON.stringify(item);
        break;
      }
    } 
    localStorage.setItem(`cartBaraton${this.ipAddress}`, JSON.stringify(cart));
    this.generalOrderedCount = 0;
    this.loadCart();
  }

  getClientIpAdress(): void{
    if (isDevMode()){
      this.ipAddress = "127.0.0.1";
    } else {
      this.http.get('http://l2.io/ip.js?var=myip')
        .subscribe( data => {
          this.ipAddress = JSON.stringify(data).replace('"myip = "', "").replace('";', "")
          //this.ipAddress = data.myip;
          //console.log(data);
      })
    }
  }


}
