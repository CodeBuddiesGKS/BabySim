import { EyeColor } from './eye-color';
import { Gender } from './gender';
import { HairColor } from './hair-color';
import { SkinColor } from './skin-color';

export class Baby {
    public age: number = 0;
    public causeOfDeath: string[] = [];
    public isDead: boolean = false;
    public isSuccessful: boolean = false;
    public name: string;
    
    public eyeColor: EyeColor;
    public gender: Gender;
    public hairColor: HairColor;
    public skinColor: SkinColor;

    public crapiness: number = 10;
    public grumpiness: number = 12;
    public snooziness: number = 10;
    public starviness: number = 10;
    
    constructor(eyeColor: EyeColor,
                gender: Gender,
                hairColor: HairColor,
                name: string,
                skinColor: SkinColor) {
        this.eyeColor = eyeColor; 
        this.gender = gender; 
        this.hairColor = hairColor; 
        this.name = name; 
        this.skinColor = skinColor; 
    }
}