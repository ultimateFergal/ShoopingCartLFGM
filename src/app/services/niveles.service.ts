import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Sublevel } from '../models/sublevel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NivelesService {

  nivelesList: AngularFireList<Sublevel>;
  selectedNivel: Sublevel = new Sublevel();

  private dataObsNivelClicked$ = new Subject();

  constructor(private firabasebd: AngularFireDatabase) { }
  
  getNivelesList(){
    this.nivelesList = this.firabasebd.list('categories'); 
    return this.nivelesList
  }

/*   getNivel(id: number): Observable<Sublevel> {                        
    return this.getNivelesList()
        //.do(data => console.log('getProduct: ' + JSON.stringify(data.find(e => e.encuesta === id))))
        .map((encuestas: Sublevel[]) => encuestas.find(e => e.encuesta == id));
    /*const url = `${this.baseUrl}/${id}`;console.log(url)
    return this.http.get(url)
        .map(this.extractData)
        .do(data => console.log('getEncuesta: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }  */

  updateNivelClickedService(encuesta: number) {
    this.dataObsNivelClicked$.next(encuesta);
  }

  getNivelClickedService() {
      return this.dataObsNivelClicked$;
  }
}
