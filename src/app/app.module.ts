import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { FormsModule }                from "@angular/forms";
import { DataTableModule }            from "angular2-datatable";

import { AppComponent }               from './app.component';
import { NavBarComponent }            from './shared/nav-bar/nav-bar.component';
import { TiendaComponent }            from './tienda/tienda.component';
import { ErrorComponent }             from './error/error.component';
import { CarritoComponent }           from './carrito/carrito.component';

import { AppRoutingModule }           from './shared/app.routing';

//Firebase
import { AngularFireModule }          from 'angularfire2';
import { AngularFireDatabaseModule }  from 'angularfire2/database';

//Environment config
import { environment }                from '../environments/environment';

//Services
import { NivelesService }             from './services/niveles.service';
import { TiendaService }              from './services/tienda.service';

import { NivelesComponent }           from './niveles/niveles.component';
import { ReplaceSpaceXDash }          from './shared/pipes/replace-space-x-dash';
import { HttpModule }                 from '@angular/http';

import { DataFilterPipe }             from './shared/pipes/data-filter.pipe';
import { DataFilterPipeAvailable }    from './shared/pipes/data-filterAvailable.pipe';
import { DataFilterPipeQuantity } from './shared/pipes/data-filterQuantity.pipe.';
import { DataFilterPipePriceRange } from './shared/pipes/data-filterPriceRange.pipe';
import { LegibleBoolean } from './shared/pipes/legible-boolean';
import { ProductosCarritoService } from './services/productos-carrito.service';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TiendaComponent,
    ErrorComponent,
    CarritoComponent,
    NivelesComponent,
    ReplaceSpaceXDash,
    DataFilterPipe, 
    DataFilterPipeAvailable,
    DataFilterPipeQuantity,
    DataFilterPipePriceRange,
    LegibleBoolean,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule, 
    DataTableModule, 
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    NivelesService,
    TiendaService,
    ProductosCarritoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
