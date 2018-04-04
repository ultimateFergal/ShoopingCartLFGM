import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilterPriceRange"
})
export class DataFilterPipePriceRange implements PipeTransform {

    transform(array: any[], query: any): any {
        if (query && query != "Todos") {
            var priceArray = query.split("-"); console.log(+priceArray[0]); console.log(+priceArray[1])
            return _.filter(array, row=>+priceArray[0] < parseInt(row.price.replace("$", "").replace(",", "")) && +priceArray[1] > parseInt(row.price.replace("$", "").replace(",", "")));
        }
        return array;
    }
}