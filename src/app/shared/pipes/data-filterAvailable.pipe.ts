import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilterAvailable"
})
export class DataFilterPipeAvailable implements PipeTransform {

    transform(array: any[], query: any): any {
        if (query && query != "Todos") {
            query = (query == "true");
            return _.filter(array, row=>row.available == query);
        }
        return array;
    }
}