import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TradeInProcessService } from 'src/app/shared/services/trade-in-process.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-trade-in-request-jewelry-material',
  templateUrl: './trade-in-request-jewelry-material.component.html',
  styleUrls: ['./trade-in-request-jewelry-material.component.scss']
})
export class TradeInRequestJewelryMaterialComponent implements OnInit {

  constructor(private tradeInProcessService: TradeInProcessService, 
              private router: Router,
              private snackBarService: SnackbarService) { }

  ngOnInit() {

  }

  onButtonClicked(event) {
      this.tradeInProcessService.setMaterial(event.value);
  }

  onNextClicked() {
    if (this.tradeInProcessService.hasMaterial()) {
      this.router.navigate(['/trade-in/piece']);
    } else {
        this.snackBarService.show('Please choose your jewelry material type.');
    }
  }

  onBackClicked() {
    this.router.navigate(['/trade-in/type']);
  }

}
