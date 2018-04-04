import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TiendaComponent } from '../tienda/tienda.component';
import { ErrorComponent } from '../error/error.component';
import { CarritoComponent } from '../carrito/carrito.component';
import { CheckoutComponent } from '../checkout/checkout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'checkout' , component: CheckoutComponent},
            { path: 'carrito' , component: CarritoComponent},
            { path: 'tienda' , component: TiendaComponent},
            { path: '' , component: TiendaComponent},
            { path: '**' , component: ErrorComponent }
        ])    
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})

export class AppRoutingModule{}