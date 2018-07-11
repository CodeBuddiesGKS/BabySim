import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations';

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
    styleUrls: ['./baby-care.component.scss'],
    animations: [
        trigger('instructionState', [
            state('open', style({
                transform: 'rotateY(0)'
            })),
            state('closed', style({
                transform: 'rotateY(180deg)'
            })),
            transition('open => closed', animate('300ms')),
            transition('closed => open', animate('300ms')),
        ]),
    ]
})
export class BabyCareComponent implements OnInit {
    @Input() babySelected;
    @Output() navigateTo = new EventEmitter<CurrentBabyPage>();
    private backButtonName: string;
    private canvas;
    private context;
    private instState: string = "open";
    private canState: string = "closed";

    constructor(private appService: AppService) {}

    ngOnInit() {
        this.backButtonName = "Abandon";
        this.canvas = $('#babyCanvas')[0]; //document.getElementById('babyCanvas');
        this.context = this.canvas.getContext('2d');
        this.drawBaby();
        this.drawStats();
    }

    toggleStates() {
        this.instState = this.instState == "open" ? "closed" : "open";
        this.canState = this.canState == "open" ? "closed" : "open";
    }

    getGender(baby) {
        return {
            'fa-mars': baby.gender == Gender.Male,
            'fa-venus': baby.gender == Gender.Female,
            'fa-transgender': baby.gender == Gender.Transgender,
            'fa-genderless': baby.gender == Gender.Other
        }
    }

    feed() {
        this.babySelected.starviness -= 3;
        if (this.babySelected.starviness < -1) {
            this.babySelected.starviness = -1;
        }
        this.age();
        if (!this.babySelected.isDead && !this.babySelected.isSuccessful) {
            this.drawStats();
        }
    }

    clean() {
        this.babySelected.poopiness -= 4;
        if (this.babySelected.poopiness < -1) {
            this.babySelected.poopiness = -1;
        }
        this.age();
        if (!this.babySelected.isDead && !this.babySelected.isSuccessful) {
            this.drawStats();
        }
    }

    sleep() {
        this.babySelected.snooziness -= 5;
        if (this.babySelected.snooziness < -1) {
            this.babySelected.snooziness = -1;
        }
        this.age();
        if (!this.babySelected.isDead && !this.babySelected.isSuccessful) {
            this.drawStats();
        }
    }

    cuddle() {
        this.babySelected.starviness += 2;
        this.babySelected.poopiness += 2;
        this.babySelected.snooziness += 2;
        this.babySelected.grumpiness--;
        if (this.babySelected.grumpiness == 0) {
            this.win(this.babySelected.name + " grew up and moved out of your house. You Win!!!");
        }
        this.age();
        if (!this.babySelected.isDead && !this.babySelected.isSuccessful) {
            this.drawStats();
        }
    }

    age() {
        this.babySelected.age++;
        this.babySelected.starviness++;
        if (this.babySelected.starviness > 12) {
            this.babySelected.causeOfDeath.push(this.babySelected.name + " starved to death!!!");
        }
        this.babySelected.poopiness++;
        if (this.babySelected.poopiness > 12) {
            this.babySelected.causeOfDeath.push(this.babySelected.name + " pooped to death!!!");
        }
        this.babySelected.snooziness++;
        if (this.babySelected.snooziness > 12) {
            this.babySelected.causeOfDeath.push(this.babySelected.name + " died from sleep");
            this.babySelected.causeOfDeath.push("deprivation!!!");
        }
        if (this.babySelected.starviness > 12 || this.babySelected.poopiness > 12 || this.babySelected.snooziness > 12) {
            this.die();
        }
    }

    die() {
        this.babySelected.isDead = true;
        this.backButtonName = "Bury Baby";
        this.drawLoss();
    }

    win(winningMessage: string) {
        this.babySelected.isSuccessful = true;
        this.backButtonName = "Move on with my life";
        console.log(winningMessage);
        this.drawWin();
    }

    abandon() {
        if (this.babySelected.isDead || this.babySelected.isSuccessful) {
            let i = this.appService.babies.indexOf(this.babySelected);
            this.appService.babies.splice(i, 1);
        }
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
            case 'Vanilla': return '#ffdbac';
            case 'Caramel': return '#c68642';
            case 'Hazelnut': return '#8d5524';
            case 'Mocha': return '#2e160a';
        }
    }

    canvasStyle() {
        if (this.babySelected.isDead) {
            return { 'background-color': '#d9534f' }
        } else if (this.babySelected.isSuccessful) {
            return { 'background-color': '#5cb85c' }
        } else {
            return { 'background-color': 'powderblue' }
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
        this.drawAge();

        //Stat Container
        this.context.fillStyle = '#efefef';
        this.context.beginPath();
        this.context.rect(20, 280, 360, 300); //x,y,width,height
        this.context.closePath();
        this.context.fill();
        this.context.stroke();

        //Starve Label
        this.context.fillStyle = 'black';
        this.context.font = "10pt 'Press Start 2P'";
        this.context.fillText('Starve-o-meter:', 50, 310);
        //Starve Container
        this.context.fillStyle = '#337ab7';
        this.context.strokeStyle = 'black';
        this.context.beginPath();
        this.context.rect(49, 310, 305, 40); //x,y,width,height
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
        //Starve Progress
        this.context.fillStyle = 'yellow';
        this.context.strokeStyle = 'white';
        this.context.beginPath();
        var x = 30;
        for (let i=0; i<this.babySelected.starviness; i++) {
            x = x + 25;
            this.context.rect(x, 315, 17.5, 30); //x,y,width,height
        }
        this.context.closePath();
        this.context.fill();
        this.context.stroke();

        //Poop Label
        this.context.fillStyle = 'black';
        this.context.font = "10pt 'Press Start 2P'";
        this.context.fillText('Poop-o-meter:', 50, 380);
        //Poop Container
        this.context.fillStyle = '#337ab7';
        this.context.strokeStyle = 'black';
        this.context.beginPath();
        this.context.rect(49, 380, 305, 40); //x,y,width,height
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
        //Poop Progress
        this.context.fillStyle = 'yellow';
        this.context.strokeStyle = 'white';
        this.context.beginPath();
        var x = 30;
        for (let i=0; i<this.babySelected.poopiness; i++) {
            x = x + 25;
            this.context.rect(x, 385, 17.5, 30); //x,y,width,height
        }
        this.context.closePath();
        this.context.fill();
        this.context.stroke();

        //Snooze Label
        this.context.fillStyle = 'black';
        this.context.font = "10pt 'Press Start 2P'";
        this.context.fillText('Snooze-o-meter:', 50, 450);
        //Snooze Container
        this.context.fillStyle = '#337ab7';
        this.context.strokeStyle = 'black';
        this.context.beginPath();
        this.context.rect(49, 450, 305, 40); //x,y,width,height
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
        //Snooze Progress
        this.context.fillStyle = 'yellow';
        this.context.strokeStyle = 'white';
        this.context.beginPath();
        var x = 30;
        for (let i=0; i<this.babySelected.snooziness; i++) {
            x = x + 25;
            this.context.rect(x, 455, 17.5, 30); //x,y,width,height
        }
        this.context.closePath();
        this.context.fill();
        this.context.stroke();

        //Grump Label
        this.context.fillStyle = 'black';
        this.context.font = "10pt 'Press Start 2P'";
        this.context.fillText('Grump-o-meter:', 50, 520);
        //Grump Container
        this.context.fillStyle = '#337ab7';
        this.context.strokeStyle = 'black';
        this.context.beginPath();
        this.context.rect(49, 520, 305, 40); //x,y,width,height
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
        //Grump Progress
        this.context.fillStyle = 'yellow';
        this.context.strokeStyle = 'white';
        this.context.beginPath();
        var x = 30;
        for (let i=0; i<this.babySelected.grumpiness; i++) {
            x = x + 25;
            this.context.rect(x, 525, 17.5, 30); //x,y,width,height
        }
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }

    drawAge() {
        //Age Container
        this.context.fillStyle = '#efefef';
        this.context.beginPath();
        this.context.rect(280, 20, 100, 100); //x,y,width,height
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
        //Age Label
        this.context.fillStyle = 'black';
        this.context.font = "10pt 'Press Start 2P'";
        this.context.fillText('Age:', 300, 50);
        //Age Progress
        this.context.fillStyle = '#337ab7';
        this.context.font = "18pt 'Press Start 2P'";
        this.context.fillText(this.babySelected.age, 300, 90);
    }

    drawLoss() {
        this.drawAge();

        //Loss Container
        this.context.fillStyle = '#efefef';
        this.context.beginPath();
        this.context.rect(20, 280, 360, 300); //x,y,width,height
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
        //1st Message
        this.context.fillStyle = 'black';
        this.context.font = "14pt 'Press Start 2P'";
        this.context.fillText("You failed as a", 40, 320);
        this.context.fillText("parent!", 40, 340);
        //2nd Message
        this.context.fillStyle = 'black';
        this.context.font = "12pt 'Press Start 2P'";
        this.context.fillText("It only took you", 40, 380);
        this.context.fillStyle = '#d9534f';
        this.context.fillText(this.babySelected.age + " years", 40, 400);
        this.context.fillStyle = 'black';
        this.context.fillText("to kill your baby!", 40, 420);
        //Causes of Death
        let y = 460;
        for (let i=0; i<this.babySelected.causeOfDeath.length; i++) {
            this.context.fillStyle = 'black';
            this.context.font = "10pt 'Press Start 2P'";
            this.context.fillText(this.babySelected.causeOfDeath[i], 40, y);
            y += 20;
        }
    }

    drawWin() {
        this.drawAge();

        //Win Container
        this.context.fillStyle = '#efefef';
        this.context.beginPath();
        this.context.rect(20, 280, 360, 300); //x,y,width,height
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
        //1st Message
        this.context.fillStyle = 'black';
        this.context.font = "14pt 'Press Start 2P'";
        this.context.fillText("You succeeded", 40, 320);
        this.context.fillText("as a parent!", 40, 340);
        //2nd Message
        this.context.fillStyle = 'black';
        this.context.font = "12pt 'Press Start 2P'";
        this.context.fillText("It only took you", 40, 380);
        this.context.fillStyle = '#5cb85c';
        this.context.fillText(this.babySelected.age + " years", 40, 400);
        this.context.fillStyle = 'black';
        this.context.fillText("to raise a healthy", 40, 420);
        this.context.fillText("baby!", 40, 440);
        //3rd Message
        this.context.fillStyle = 'black';
        this.context.font = "10pt 'Press Start 2P'";
        this.context.fillText("I bet that was fun...", 40, 480);
    }
}