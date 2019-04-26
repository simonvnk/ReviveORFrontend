import { Component, OnInit } from '@angular/core';
import { TradeInProcessService } from 'src/app/shared/services/trade-in-process.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trade-in-request-jewelry-type',
  templateUrl: './trade-in-request-jewelry-type.component.html',
  styleUrls: ['./trade-in-request-jewelry-type.component.scss']
})
export class TradeInRequestJewelryTypeComponent implements OnInit {

  constructor(public tradeInProcessService: TradeInProcessService, private router: Router) { }

  ngOnInit() {}

  onButtonClicked(event) {
    this.tradeInProcessService.setType(event.value);
  }

  onNextClicked() {
    if (this.tradeInProcessService.tradeInProcessContainer.jewelryType.length > 0) {
      this.router.navigate(['/trade-in/material']);
    } else {
        console.log('ded');
    }
  }

  onBackClicked() {

  }
}
