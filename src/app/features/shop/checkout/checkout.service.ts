import {Injectable} from '@angular/core';
import {ShippingAddressModel} from '../../../shared/services/address/shippingAddressModel';
import {EMPTY, empty, Observable, of, pipe, Subject} from 'rxjs';
import {APIService} from '../../../shared/services/api/api.service';
import {ShoppingCartService} from '../cart/cart.service';
import {CartItem} from '../cart/cart-product.model';
import {first, switchMap, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {


    useAddressForm = false;

    shippingAddress: ShippingAddressModel = {
        firstname: '',
        lastname: '',
        address1: '',
        address2: '',
        country: '',
        zipcode: '',
        city: '',
        province: ''
    };

    constructor(private apiService: APIService, private cartService: ShoppingCartService) {

    }


    getCheckoutUrl(): Observable<any> {
        return this.cartService.cartItemsSubject.pipe(
            switchMap((cartItems) => this.submitOrder(cartItems))
        );
    }

    checkPaymentStatus() {

    }

    private submitOrder(cartItems: CartItem[]) {
        const order: Object = this.createOrder(cartItems);
        console.log('Submitting order', order);
        return this.apiService.post('checkout', order);
    }

    private createOrder(cartItems: CartItem[]): Object {
        const productIds = [];
        for (const cartItem of cartItems) {
            productIds.push({id: cartItem.product.id});
        }
        return {
            useNewAddress: this.useAddressForm,
            shipping: this.shippingAddress,
            products: productIds
        };
    }
}
