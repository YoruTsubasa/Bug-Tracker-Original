import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  transform(array: any, pageSize: number, pageNumber: number): any[] {
    if(!Array.isArray(array))
      return [];

    let startIndex = pageSize * pageNumber;

    if(startIndex > array.length)
      return [];

    return array.filter((element, index) => {
      return index >= startIndex && index < startIndex + 7;
    });
  }
}
