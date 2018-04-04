import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { NivelesService } from '../services/niveles.service';
import { TiendaService } from '../services/tienda.service';
import { Sublevel } from '../models/sublevel';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesComponent implements OnInit {

  nivelesList: Sublevel[];

  tipoNivel: string;
  containerClass: string;
  nColumns: string;
  clrHeading: string = ""; 
  panel_default: string = "";
  bgCPanel: string;

  @Input() subLevelList: Sublevel[];
  @Input() titulo: string;

  @Output() nivelClicked: EventEmitter<any> = new EventEmitter<any>();

  private dataObsAntSelected$ = new Subject();

  constructor(private nivelesService: NivelesService, private tiendaService: TiendaService) { }

  ngOnInit() {
    //Se verifica si se va a iterar sobre las categorías raices o los subniveles para armar el menú de categorías
    if (!this.subLevelList){

      //Manejo de estilo de acuerdo a si es categoría o subnivel
      this.tipoNivel = "Categoría";
      this.containerClass = "container";
      this.nColumns = "3";
      this.clrHeading = "clrHeadingCategories";
      this.panel_default = "panel-default";
      this.bgCPanel = "bgColorCategories";

      //Información de de niveles desde la base de datos
      this.nivelesService.getNivelesList()
        .snapshotChanges()
        .subscribe(item => {
          this.nivelesList = [];
          item.forEach(element =>{
          let x = element.payload.toJSON();
          x["id"] = element.key;//key es por firebase, id de la forma definida del objeto
          this.nivelesList.push(x as Sublevel);
          })
      })
    }
    else {

      //Manejo de estilo de acuerdo a si es categoría o subnivel
      this.tipoNivel  = "Subnivel";
      this.nColumns   = "12";
      this.clrHeading = "clrHeadingSubLevels";
      this.bgCPanel   = "bgColorSubLevels";

      //Convierte el elemento de objeto y lo convierte en array de acuerdo a su contenido
      //para poder volver iterar sobre él como si fuera la lista inicial de categorías
      var output=[];
      
      for (var key in this.subLevelList) {
        if (this.subLevelList.hasOwnProperty(key)) {
          output.push(this.subLevelList[key]);
        }
      }

      this.nivelesList = output;
    }
      
  }

  onClick(subnivel: any): void{
    //var infoNivel = [idNivel.toString(), tipoNivel, nombreNivel];console.log("infoNivel");console.log(infoNivel);
    this.nivelClicked.emit(subnivel);
  }


  onNivelClicked(item): void{
    //var infoNivel = [idNivel.toString(), tipoNivel, nombreNivel];
    console.log("itemNiveles");
    item.tipoNivel = this.tipoNivel;
    console.log(item)
    this.tiendaService.updateNivelClickedService(item);
    
  }

}
