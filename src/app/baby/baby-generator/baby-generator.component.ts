import { Component, OnInit, Output, EventEmitter } from '@angular/core'

import { AppService } from '../../core/app.service';

import { Baby } from '../../core/models/baby';
import { CurrentBabyPage } from '../shared/models/current-baby-page';
import { EyeColor } from '../../core/models/eye-color';
import { Gender } from '../../core/models/gender';
import { HairColor } from '../../core/models/hair-color';
import { SkinColor } from '../../core/models/skin-color';
import $ from 'jquery';

@Component( {
    selector: 'baby-generator',
    templateUrl: './baby-generator.component.html',
    styleUrls: ['./baby-generator.component.scss']
})
export class BabyGeneratorComponent implements OnInit {
    @Output() navigateTo = new EventEmitter<CurrentBabyPage>();
    private eyeColor: EyeColor;
    private gender: Gender;
    private hairColor: HairColor;
    private name: string;
    private skinColor: SkinColor;

    constructor(private appService: AppService) {}

    ngOnInit() {
    }

    giveBirth() {
        if (this.eyeColor && this.gender && this.hairColor && this.name && this.skinColor) {
            this.appService.babies.push(new Baby(this.eyeColor, this.gender, this.hairColor, this.name, this.skinColor));
            this.appService.load();
            this.navigateTo.emit(CurrentBabyPage.BabySelector);
        }
    }
}