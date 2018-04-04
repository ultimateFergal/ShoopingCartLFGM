import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'legibleBoolean'})

export class LegibleBoolean implements PipeTransform {
    transform(value: any): string {
        //return `${newValue}`;
        return value == true ? "Disponible" : "Agotado" ;
    }
}