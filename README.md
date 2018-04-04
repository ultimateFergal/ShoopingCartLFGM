# LFGMELBARATON

Este proyecto se compila en modo de desarrollo o de producci{on de acuerdo a las indicaciones más abajo por haber sido hecho con Angular-cli. 

Se decidió usar dos fuentes para la base de datos. La parte de la información de niveles se quiso manejar a través de la base de datos en tiempo real de Google, Firebase. Los datos de los productos se encuentran dentro del código de la aplicación.

Se hace uso de la ventaja del AngularDatatables para las funcionalidades de búsqueda y filtrado de la tabla, se optó esto sobre la utilzación de la librería lodas, que también es muy ventajosa.

Se hace uso del localstorage del navegador y sus funcionalidades en javascript para guardar la información del carrito, su modificación y eliminación.

La generación dinámica de niveles de acuerdo a la información en el archivo json se da implementando iteración del mismo componente de niveles, también se puede hacer de una forma más manueal. 



-----------------------------------------------------------------------------

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
