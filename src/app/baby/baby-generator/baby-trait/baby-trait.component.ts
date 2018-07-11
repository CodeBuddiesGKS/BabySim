import {Component, Input, Output, EventEmitter} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'baby-trait',
    templateUrl: './baby-trait.component.html',
    styleUrls: ['./baby-trait.component.scss']
})
export class BabyTraitComponent {
    @Input() trait: any;
    @Output() traitChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(private sanitizer: DomSanitizer) {}

    tileClass(option) {
        return {
            'quad-flex-child': true,
            'selected-tile': option.name===this.trait.selected,
            'tl': option.name===this.trait.options[0].name,
            'tr': option.name===this.trait.options[1].name,
            'bl': option.name===this.trait.options[2].name,
            'br': option.name===this.trait.options[3].name
        };
    }

    tileStyle(option) {
        return {'background-color': option.backgroundColor};
    }

    tileClicked(option) {
        this.trait.selected = option.name;
    }
}