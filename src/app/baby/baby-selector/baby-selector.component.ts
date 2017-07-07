import { Component, OnInit, Output, EventEmitter } from '@angular/core'

import { AppService } from '../../core/app.service';

import { Baby } from '../../core/models/baby';
import { CurrentBabyPage } from '../shared/models/current-baby-page';
import { EyeColor } from '../../core/models/eye-color';
import { Gender } from '../../core/models/gender';
import { HairColor } from '../../core/models/hair-color';
import { SkinColor } from '../../core/models/skin-color';

@Component( {
    selector: 'baby-selector',
    templateUrl: './baby-selector.component.html',
    styleUrls: ['./baby-selector.component.scss']
})
export class BabySelectorComponent implements OnInit {
    @Output() babySelected = new EventEmitter<Baby>();
    @Output() navigateTo = new EventEmitter<CurrentBabyPage>();

    constructor(private appService: AppService) {}

    ngOnInit() {
    }

    getGender(baby) {
        return {
            'fa-mars': baby.gender == Gender.Male,
            'fa-venus': baby.gender == Gender.Female,
            'fa-transgender': baby.gender == Gender.Transgender,
            'fa-genderless': baby.gender == Gender.Other
        }
    }

    takeCare(baby) {
        //this.appService.load();
        this.babySelected.emit(baby);
        this.navigateTo.emit(CurrentBabyPage.BabyCare);
    }

    conceive() {
        this.appService.load();
        this.navigateTo.emit(CurrentBabyPage.BabyGenerator);
    }
}