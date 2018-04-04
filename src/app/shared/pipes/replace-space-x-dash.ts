import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replaceSpaceXDash'})

export class ReplaceSpaceXDash implements PipeTransform {
    transform(value: string): string {
        let newValue = value.replace(/ /g, '-');//Reemplazo global de espacios por guiones
        //return `${newValue}`;
        return newValue;
    }
}