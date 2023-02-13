import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(array: any, field: string, ascending: boolean): any[] {
    if(!Array.isArray(array))
      return [];

    array.sort((entryA, entryB) => {
      if(ascending)
        return entryA[field] < entryB[field] ? -1 : 1;

      return entryA[field] > entryB[field] ? -1 : 1;
    });

    return array;
  }
}
