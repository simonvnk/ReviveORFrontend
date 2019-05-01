import { TempApiService } from 'src/app/shared/services/api/temp-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { ORProduct } from './or-product.model';

@Injectable({
  providedIn: 'root'
})
export class ORProductService {

    constructor(private api: TempApiService) { }

    public getAll(): Observable<ORProduct[]> {
        return this.api.get<ORProduct[]>('products');
    }

    public getAllWithTypeAndMaterial(type: string, material: string): Observable<ORProduct[]> {
        return this.api.get<ORProduct[]>('products').pipe(
            map(products => products
                .filter(product => this.filterType(product, type))
                .filter(product => this.filterMaterial(product, material)))
        );
    }

    private filterType(product: ORProduct, type: string) {
        return product.category.name.toLowerCase() === type;
    }

    private filterMaterial(product: ORProduct, material: string) {
        const name = product.name.toLowerCase();
        if (material === 'other') {
            return !name.includes('gold') && !name.includes('silver');
        } else {
            return name.includes(material);
        }
    }

}