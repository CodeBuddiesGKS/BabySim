import { Component, OnInit } from '@angular/core'

import { AppService } from '../core/app.service';

import { Baby } from '../core/models/baby';
import { CurrentBabyPage } from './shared/models/current-baby-page';

@Component( {
    selector: 'baby',
    templateUrl: './baby.component.html',
    styleUrls: ['./baby.component.scss']
})
export class BabyComponent implements OnInit {
    private babySelected: Baby;
    private currentPage: CurrentBabyPage;

    constructor(private appService: AppService) {}

    ngOnInit() {
        this.currentPage = CurrentBabyPage.BabySelector; 
    }

    navigateTo(num) {
        this.currentPage = num;
    }
}