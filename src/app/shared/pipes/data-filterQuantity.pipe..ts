import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilterQuantity"
})
export class DataFilterPipeQuantity implements PipeTransform {

    transform(array: any[], query: number): any {
        if (query) {
            return _.filter(array, row=>row.quantity == query);
        }
        return array;
    }
}