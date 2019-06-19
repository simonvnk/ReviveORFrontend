import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProductModel} from './product.model';
import {ProductService} from './product.service';
import {Observable} from 'rxjs';

@Injectable()
export class ProductEditResolver implements Resolve<ProductModel> {
    constructor(private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
    ): Observable<any>|Promise<any> {
        return this.productService.getEditProduct(route.params.id);
    }


}
