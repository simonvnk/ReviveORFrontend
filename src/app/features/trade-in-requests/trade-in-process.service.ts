import { Injectable } from '@angular/core';
import { TradeInProcessContainer } from './trade-in-process-container.model';
import { ORProduct } from 'src/app/shared/services/or-product/or-product.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TradeInProcessService {

    emptyContainer: TradeInProcessContainer;
    tradeInProcessContainer: TradeInProcessContainer = {
        currentStep: 0,
        jewelryType: '',
        jewelryMaterial: '',
        jewelryPiece: {},
        estimatedCredit: 0,
        property: '',
        missing: false,
        scratched: false,
        bent: false,
        broken: false
    };

    constructor(private http: HttpClient) {
        this.emptyContainer = JSON.parse(JSON.stringify(this.tradeInProcessContainer));
        localStorage.emptyContainer = JSON.stringify(this.emptyContainer);

        if (localStorage.getItem('tradeInProcessContainer') !== null) {
            this.tradeInProcessContainer = JSON.parse(localStorage.getItem('tradeInProcessContainer'));
        }
    }

    submitRequest(tradeInRequest) {
        return this.http.post(`${environment.reviveORAPIUrl}tradeinrequests`, tradeInRequest);
    }

    setCurrentStep(step) {
        setTimeout(() => {
            this.tradeInProcessContainer.currentStep = step;
            this.storeContainer();
        });
    }

    hasCondition() {
        return this.hasMissing() && this.hasScratched && this.hasBent && this.hasBroken();
    }
    getCondition() {
        return {'Missing': this.getMissing(), 'Scratched': this.getScratched(), 'Bent': this.getBent(), 'Broken': this.getBroken()};
    }

    hasProperty() { return this.tradeInProcessContainer.property.length > 0; }
    getProperty() { return this.tradeInProcessContainer.property; }
    setProperty(property) {
        this.tradeInProcessContainer.property = property;
        this.storeContainer();
    }

    hasMissing() { return this.tradeInProcessContainer.missing !== null; }
    getMissing() { return this.tradeInProcessContainer.missing; }
    setMissing(missing) {
        this.tradeInProcessContainer.missing = missing;
        this.storeContainer();
    }

    hasScratched() { return this.tradeInProcessContainer.scratched !== null; }
    getScratched() { return this.tradeInProcessContainer.scratched; }
    setScratched(scratched) {
        this.tradeInProcessContainer.scratched = scratched;
        this.storeContainer();
    }

    hasBent() { return this.tradeInProcessContainer.bent !== null; }
    getBent() { return this.tradeInProcessContainer.bent; }
    setBent(bent) {
        this.tradeInProcessContainer.bent = bent;
        this.storeContainer();
    }

    hasBroken() { return this.tradeInProcessContainer.broken !== null; }
    getBroken() { return this.tradeInProcessContainer.broken; }
    setBroken(broken) { this.tradeInProcessContainer.broken = broken; this.storeContainer(); }

    hasType() { return this.tradeInProcessContainer.jewelryType.length > 0; }
    getType() { return this.tradeInProcessContainer.jewelryType; }
    setType(type: string) {
        this.tradeInProcessContainer.jewelryType = type;
        this.storeContainer();
    }

    hasMaterial() { return this.tradeInProcessContainer.jewelryMaterial.length > 0; }
    getMaterial() { return this.tradeInProcessContainer.jewelryMaterial; }
    setMaterial(material: string) {
        this.tradeInProcessContainer.jewelryMaterial = material;
        this.storeContainer();
    }

    hasPiece() {
        return Object.entries(this.tradeInProcessContainer.jewelryPiece).length !== 0 &&
        this.tradeInProcessContainer.jewelryPiece.constructor === Object;
    }
    getPiece() { return this.tradeInProcessContainer.jewelryPiece; }
    setPiece(piece: ORProduct) {
        this.tradeInProcessContainer.jewelryPiece = piece;
        this.storeContainer();
    }

    reset() {
        this.tradeInProcessContainer = JSON.parse(JSON.stringify(this.emptyContainer));
        localStorage.removeItem('tradeInProcessContainer');
    }

    private storeContainer() {
        localStorage.tradeInProcessContainer = JSON.stringify(this.tradeInProcessContainer);
    }
}
