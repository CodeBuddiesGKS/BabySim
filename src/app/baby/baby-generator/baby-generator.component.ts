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
    private name: string;
    private traits: any;

    constructor(private appService: AppService) {}

    ngOnInit() {
        loadJSON("src/app/baby/baby-generator/models/traits.json").then(traits => {
            this.traits = traits;
        });
    }

    getSelectedTraits() {
        let selectedTraits: any[] = [];
        this.traits.forEach(trait => {
            if (trait.selected) {
                selectedTraits.push(trait.selected);
            }
        });
        return selectedTraits;
    }

    giveBirth() {
        let selectedTraits = this.getSelectedTraits();
        if (this.name && this.traits.length===selectedTraits.length) {
            this.appService.babies.push(
                new Baby(this.name, selectedTraits)
            );
            this.appService.load();
            this.navigateTo.emit(CurrentBabyPage.BabySelector);
        }
    }
}

export function loadJSON(url) {
    return fetch(url).then(response => response.json());
}