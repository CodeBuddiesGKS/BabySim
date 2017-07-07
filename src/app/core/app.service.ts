import { Injectable, EventEmitter } from '@angular/core';

import { Baby } from '../core/models/baby';
import { EyeColor } from '../core/models/eye-color';
import { Gender } from '../core/models/gender';
import { HairColor } from '../core/models/hair-color';
import { SkinColor } from '../core/models/skin-color';

@Injectable()
export class AppService {
    public loading: EventEmitter<boolean> = new EventEmitter<boolean>();

    public babies: Baby[] = [
        new Baby(EyeColor.Blue, Gender.Male, HairColor.Blonde, 'Adam', SkinColor.Pasty),
        new Baby(EyeColor.Green, Gender.Female, HairColor.Red, 'Eve', SkinColor.Caramel),
        new Baby(EyeColor.Hazel, Gender.Transgender, HairColor.Brown, 'Jesse', SkinColor.Mocha),
        new Baby(EyeColor.Brown, Gender.Other, HairColor.Black, 'Dren', SkinColor.Midnight),
    ];

    constructor() {}

    load() {
        this.loading.emit(true);
        setTimeout(() => {
            this.loading.emit(false);
        }, 3000);
    }
}