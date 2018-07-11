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
        new Baby('Adam', [Gender.Male, SkinColor.Vanilla, HairColor.Blonde, EyeColor.Blue]),
        new Baby('Eve', [Gender.Female, SkinColor.Caramel, HairColor.Red, EyeColor.Green]),
        new Baby('Jesse', [Gender.Transgender, SkinColor.Hazelnut, HairColor.Brown, EyeColor.Hazel]),
        new Baby('Dren', [Gender.Other, SkinColor.Mocha, HairColor.Black, EyeColor.Brown]),
    ];

    constructor() {}

    load() {
        this.loading.emit(true);
        setTimeout(() => {
            this.loading.emit(false);
        }, 3000);
    }
}