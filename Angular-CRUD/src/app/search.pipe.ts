import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchTerm: string): any[] {
    if (!products || !searchTerm) {
        return products;
    }

    return products.filter(product =>
      product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
}

}

