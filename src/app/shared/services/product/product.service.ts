import {Injectable} from '@angular/core';
import {ProductModel} from './product.model';

import {APIService} from '../api/api.service';
import {ProductRatingModel} from './product-rating.model';
import {ProductCategoryModel} from './product-category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private api: APIService) {}

    public getAllAvailableProducts() {
        return this.api.get<ProductModel[]>('products/available');
    }

    public getAllProductsWithoutStory() {
        return this.api.get<ProductModel[]>('products/withoutstory');
    }

    public getAllProducts() {
        return this.api.get<ProductModel[]>('products');
    }

    public getProduct(id: number) {
        return this.api.get<ProductModel>(`products/${id}`);
    }

    public editProduct(product: ProductModel) {
        return this.api.put<ProductModel>(`products/${product.id}`, product);
    }

    public deleteProduct(product: ProductModel) {
        return this.api.delete(`products/${product.id}`);
    }

    public createProduct(product: ProductModel) {
        return this.api.post<ProductModel>('products', product);
    }

    public getAllCategories() {
        return this.api.get<ProductCategoryModel[]>('products/categories');
    }

    public getAllRatings() {
        return this.api.get<ProductRatingModel[]>('products/ratings');
    }

    public getEditProduct(id: number) {
        return this.api.get<ProductModel>(`products/edit/${id}`);
    }
}
