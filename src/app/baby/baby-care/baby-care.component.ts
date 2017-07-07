import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { AppService } from '../../core/app.service';

import { Baby } from '../../core/models/baby';
import { CurrentBabyPage } from '../shared/models/current-baby-page';
import { EyeColor } from '../../core/models/eye-color';
import { Gender } from '../../core/models/gender';
import { HairColor } from '../../core/models/hair-color';
import { SkinColor } from '../../core/models/skin-color';

import $ from 'jquery';

@Component( {
    selector: 'baby-care',
    templateUrl: './baby-care.component.html',
    styleUrls: ['./baby-care.component.scss']
})
export class BabyCareComponent implements OnInit {
    @Input() babySelected;
    @Output() navigateTo = new EventEmitter<CurrentBabyPage>();
    private canvas;
    private context;

    constructor(private appService: AppService) {}

    ngOnInit() {
        this.canvas = $('#babyCanvas')[0]; //document.getElementById('babyCanvas');
        this.context = this.canvas.getContext('2d');
        this.drawBaby();
        this.drawStats();
    }

    getGender(baby) {
        return {
            'fa-mars': baby.gender == Gender.Male,
            'fa-venus': baby.gender == Gender.Female,
            'fa-transgender': baby.gender == Gender.Transgender,
            'fa-genderless': baby.gender == Gender.Other
        }
    }

    abandon() {
        this.appService.load();
        this.navigateTo.emit(CurrentBabyPage.BabySelector);
    }

    degreeToRadians(degree) {
        return Math.PI/180 * degree;
    }

    outlineShape() {
        this.context.fillStyle = 'black';
        this.context.stroke();
    }

    getEyeColor(baby) {
        switch (baby.eyeColor) {
            case 'Blue': return '#699BCB';
            case 'Green': return '#6B7E47';
            case 'Hazel': return '#776536';
            case 'Brown': return '#603101';
        }
    }

    getGenderColor(baby) {
        switch (baby.gender) {
            case 'Female': return 'pink';
            case 'Male': return 'cornflowerblue';
            case 'Transgender': return 'purple';
            case 'Other': return 'darkslategrey';
        }
    }

    getHairColor(baby) {
        switch (baby.hairColor) {
            case 'Blonde': return '#f2da91';
            case 'Red': return '#a53900';
            case 'Brown': return '#4d2612';
            case 'Black': return '#000000';
        }
    }

    getSkinColor(baby) {
        switch (baby.skinColor) {
            case 'Pasty': return '#ffdbac';
            case 'Caramel': return '#c68642';
            case 'Mocha': return '#8d5524';
            case 'Midnight': return '#2e160a';
        }
    }

    drawBaby() {
        //Body
        this.context.fillStyle = this.getSkinColor(this.babySelected);
        this.context.beginPath();
        this.context.arc(150, 160, 80, 0, 2*Math.PI, false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
        //Head
        this.context.fillStyle = this.getSkinColor(this.babySelected);
        this.context.beginPath();
        this.context.arc(70, 70, 50, 0, 2*Math.PI, false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
        //Hat
        this.context.fillStyle = this.getGenderColor(this.babySelected);
        this.context.beginPath();
        this.context.arc(70, 70, 50, this.degreeToRadians(160),this.degreeToRadians(300), false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
        //Hat Ball
        this.context.fillStyle = this.getGenderColor(this.babySelected);
        this.context.beginPath();
        this.context.arc(35, 35, 5, 0, 2*Math.PI, false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
        //Left Eye
        this.context.fillStyle = this.getEyeColor(this.babySelected);
        this.context.beginPath();
        this.context.arc(60, 80, 5, 0, 2*Math.PI, false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
        //Right Eye
        this.context.fillStyle = this.getEyeColor(this.babySelected);
        this.context.beginPath();
        this.context.arc(85, 55, 5, 0, 2*Math.PI, false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
        //Mouth
        this.context.fillStyle = 'lightpink';
        this.context.beginPath();
        this.context.arc(85, 85, 20, this.degreeToRadians(300), this.degreeToRadians(150), false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
        //Left Arm
        this.context.fillStyle = this.getSkinColor(this.babySelected);
        this.context.beginPath();
        this.context.arc(70, 160, 20, 0, 2*Math.PI, false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
        //Right Arm
        this.context.fillStyle = this.getSkinColor(this.babySelected);
        this.context.beginPath();
        this.context.arc(170, 80, 20, 0, 2*Math.PI, false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
        //Underware
        this.context.fillStyle = 'white';
        this.context.beginPath();
        this.context.arc(150, 160, 80, this.degreeToRadians(320), this.degreeToRadians(140), false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
        //Left Leg
        this.context.fillStyle = this.getSkinColor(this.babySelected);
        this.context.beginPath();
        this.context.arc(150, 240, 20, 0, 2*Math.PI, false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
        //Right Leg
        this.context.fillStyle = this.getSkinColor(this.babySelected);
        this.context.beginPath();
        this.context.arc(230, 160, 20, 0, 2*Math.PI, false); //x,y,radius,startAngle,endAngle,antiClockwise
        this.context.closePath();
        this.context.fill();
        this.outlineShape();
    }

    drawStats() {
        //Stat Container
        this.context.fillStyle = '#efefef';
        this.context.beginPath();
        this.context.rect(20, 300, 360, 280); //x,y,width,height
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
        //Crap Label
        this.context.fillStyle = 'black';
        this.context.font = "10pt 'Press Start 2P'";
        this.context.fillText('Crap-o-meter:', 30, 330);
        //Stat Container
        this.context.fillStyle = 'saddlebrown';
        this.context.strokeStyle = 'firebrick';
        this.context.beginPath();
        this.context.rect(30, 335, 340, 30); //x,y,width,height
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }
}