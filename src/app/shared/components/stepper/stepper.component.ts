import { TradeInProcessService } from './../services/trade-in-process.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

    @Input() steps = [
        'Jewelry type',
        'Value',
        'Trade-in overview',
        'Complete Trade-in'
    ];
    @Input() descriptions = [
        'Determine the type of Ocean Republic jewelry.',
        'Determine the condition to estimate trade-in credit.',
        '',
        ''
    ];
    @Input() horizontal = false;
    @Input() currentStep = 0;

    constructor() { }

    ngOnInit() {
    }

}
