import { Component, OnInit, isDevMode } from '@angular/core';
import { Http } from '@angular/http';

import { TiendaService } from '../services/tienda.service';
import { Sublevel } from '../models/sublevel';
import { Product } from '../models/product';

import 'rxjs';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit{

  productList: Product[];
  filteredProductsList: Product[];

  productosCarrito: any = [];

  public filteredProductList: any[];
  private productListData: any;
  private selectedSubnivel: any;
  private selectedSubnivelId: any;
  public sorted: string = "desc";
  private ipAddress: string;
  public generalOrderedCount: number = 0;
  errorMessage: string;

//Angular2DataTable Params
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";


  constructor(private tiendaService: TiendaService, private http: Http) { }

    title: string = "Categoría: ";

    filters = {}

  ngOnInit() {

    this.getClientIpAdress();
    if(localStorage.getItem(`cartBaraton${this.ipAddress}`) != null){
      this.loadCart()
    }
    //Recibe el subnivel clickeado
    this.selectedSubnivelId = this.getSelectedSubnivel() ? this.getSelectedSubnivel()[0] : "0";   
    
    this.tiendaService.getProductosList()
      .subscribe((data) => {
            setTimeout(()=> {
              this.data = data.products;
              //this.productList = data.products;
          }, 1000);
          }, 
          error => this.errorMessage = <any>error
      );
  }

  public toInt(num: string) {
      return +num;
  }

  public sortByWordLength = (a: any) => {
      return a.name.length;
  }

  public sortByPrice = (a: any) => {
    return  parseInt(a.price.replace("$", "").replace(",", ""));
  }

  //Aplicación de filtros manuales con lodash, sin Angular2DataTable
  private applyFilters() {
    //this.filteredProductsList = _.filter(this.productList, _.conforms(this.filters) ); 
    this.data = _.filter(this.productList, _.conforms(this.filters) ); 
  }

  /// Filtrar por atributo específico con Lodash y no para Angular2DataTable
  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule
    this.applyFilters()
  }

  //Método que recibe el subnivel clickeado y ejecuta la consulta 
  //de productos para hacer el filtro de acuerdo al subnivel clickeado
  getSelectedSubnivel(): void{
    this.tiendaService.getNivelClickedService()
      .subscribe(data => {
        this.selectedSubnivel = Object.values(data); 
        //console.log("this.selectedSubnivelMetodo");
        //console.log(this.selectedSubnivel[0]);

        //Establece el título de los artículos elegidos
        this.title = "Categoría: " + this.selectedSubnivel[1];

        //Llamado a obtener la lista de productos de acuerdo a subnivel elegido
        if(this.selectedSubnivel[3] == "Subnivel"){
          this.getProductsList(this.selectedSubnivel[0]);
        }

        return this.selectedSubnivel;
        },
        ( error: any) => this.errorMessage = <any>error 
      );
  }

  //Método que obtiene lista de productos de acuerdo a un id específico
  getProductsList(idSubnivel: any){
    this.productList = [];
    this.filteredProductsList = [];
    this.filteredProductsList.length = 0;
    this.tiendaService.getProductosList()
    .subscribe(
        res => {
          this.productList = res.products;
          //console.log(res.products);
          this.filterExact('sublevel_id',idSubnivel);
        }, 
        error => this.errorMessage = <any>error
    );
/*     this.tiendaService.getProductosList()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          //if (idSubnivel == x["sublevel_id"]){
            this.productList.push(x as Product);
            //window.scrollTo(0, 0);//Regresa al top de la página
          //}          
          this.filterExact('sublevel_id',idSubnivel);

          if (this.productList.length > 0){

          }else
              this.productList.length = 0;
          
        });
        //console.log(this.productList);

        
      }) */
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

  //Función que carga la información de productos ordenados en el carrito de compras
  //almacenada en el local storage, y también para mostrar el número de artículos totales del
  //carrito en la barra de navegación
  loadCart(): void {
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
    }
  }


  //Obtiene dirección IP del cliente en el que se abre la página
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

  onNivelClicked(infoNivelClicked: any): void {
    console.log("infoNivelClicked");
    console.log(infoNivelClicked);
  }

  //Ordenamiento de columnas manual sin el Angular2 Datatable
  sortProductsList(column){

    if (this.filteredProductsList){
      if (this.sorted == "desc"){
        this.sorted = "asc"
        this.filteredProductsList.sort(compareAsc); 
      } else {
        this.sorted = "desc"
        this.filteredProductsList.sort(compareDesc); 
      }
    }
      //Reordenar vector de forma ascendente             
      function compareAsc(a,b) {

        switch(column){
          case "name":
          //Ascendente
          if (a.name > b.name)
              return -1;
          if (a.name < b.name)
              return 1;
          return 0;

          case "price":
            //Ascendente
            if (a.price > b.price)
                return -1;
            if (a.price < b.price)
                return 1;
            return 0;

          case "quantity":
            //Ascendente
            if (a.quantity > b.quantity)
                return -1;
            if (a.quantity < b.quantity)
                return 1;
            return 0;

          case "available":
            //Ascendente
            if (a.quantity > b.quantity)
                return -1;
            if (a.quantity < b.quantity)
                return 1;
            return 0;
        }        
      }
            //Reordenar vector de forma descendente             
            function compareDesc(a,b) {

              switch(column){

                case "name":
                //Ascendente
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;

                case "price":
                  //Ascendente
                  if (a.price < b.price)
                      return -1;
                  if (a.price > b.price)
                      return 1;
                  return 0;
      
                case "quantity":
                  //Ascendente
                  if (a.quantity < b.quantity)
                      return -1;
                  if (a.quantity > b.quantity)
                      return 1;
                  return 0;
      
                case "available":
                  //Ascendente
                  if (a.quantity < b.quantity)
                      return -1;
                  if (a.quantity > b.quantity)
                      return 1;
                  return 0;
              }        
            }
    
  }

}
