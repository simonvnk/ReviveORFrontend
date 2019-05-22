import {Component, OnInit, ViewChild} from '@angular/core';
import {TradeInProcessService} from '../trade-in-process.service';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {TradeInRequestModel} from '../../../admin/features/trade-in-requests/models/trade-in-request.model';
import {TradeInRequestImageModel} from '../../../admin/features/trade-in-requests/models/trade-in-request-image.model';
import {CreditIndicationService} from '../../../shared/services/credit-indication/credit-indication.service';
import {SnackbarService} from '../../../shared/services/snackbar/snackbar.service';
import {FileUploaderEvent} from '../../../shared/components/mass-file-uploader/file-uploader.event';
import {markFormGroupTouched} from '../../../shared/utilities/validators';

@Component({
    selector: 'app-trade-in-request-finalization',
    templateUrl: './trade-in-request-finalization.component.html',
    styleUrls: ['./trade-in-request-finalization.component.scss']
})
export class TradeInRequestFinalizationComponent implements OnInit {

    allowedImageExtensions = ['.png', '.jpg', '.jpeg', '.bmp'];
    imageAPIUrl = `${environment.reviveORAPIUrl}images`;

    images: TradeInRequestImageModel[];

    constructor(public tradeInProcessService: TradeInProcessService,
                private router: Router,
                private snackBarService: SnackbarService) {
    }

    ngOnInit() {
        this.tradeInProcessService.setCurrentStep(2);
        this.initializeImages();
    }

    onNextClicked() {
        if (this.images.length !== 2) {
            this.snackBarService.show('Please upload two images of your jewelry piece.', 3000);
        } else {
            this.tradeInProcessService.setImages(this.images);
            this.router.navigate(['/trade-in/overview']);
        }
    }

    onBackClicked() {
        this.router.navigate(['/trade-in/indication']);
    }

    onImageUploaded(event: FileUploaderEvent) {
        console.log('image response', event.response);
        this.images.push(event.response);
    }

    onImageUploadError(event: FileUploaderEvent) {
        console.log('image upload error', event.response);
        this.snackBarService.show('An error occurred during the upload of your file. ' +
            'Please make sure the image file size is below the maximum file size of 5MB.', 7500);
    }

    private initializeImages() {
        if (this.tradeInProcessService.hasImages()) {
            this.images = this.tradeInProcessService.getImages();
        } else {
            this.images = [];
        }
    }
}
