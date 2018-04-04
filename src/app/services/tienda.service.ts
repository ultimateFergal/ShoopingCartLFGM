import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Sublevel } from '../models/sublevel';
import { Product } from '../models/product';

import { Subject } from '../../../LFGRM-EL-BARATON/node_modules/rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TiendaService {

  productosList: AngularFireList<Product>;//<any>;
  selectProduct: Product  = new Product();

  private apiUrl = './assets/products.json';

  private dataObsNivelClicked$ = new Subject();

  constructor(private firabasebd: AngularFireDatabase, private http: Http) { }

/*   getProductosList(){
    this.productosList = this.firabasebd.list('products'); 
    return this.productosList
  } */

  getProductosList() {
    return <Observable<any>>this.http 
        .get(this.apiUrl)   
        .map((response: Response)=> <any>response.json())
        .catch(this.handleError);
}

  insertProduct(){

  }
  //Obtener información del subnivel clickeado
  updateNivelClickedService(infoNivelClicked: any) {
      this.dataObsNivelClicked$.next(infoNivelClicked);
  }

  getNivelClickedService() {
      return this.dataObsNivelClicked$;
  }

  
  private handleError(error: Response) {
    let msg = `Status code ${error.status} on url ${error.url}`;
    console.error(msg);
    return Observable.throw(msg);
    //TODO
}
}
