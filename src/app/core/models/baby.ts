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

    public poopiness: number = 10;
    public grumpiness: number = 12;
    public snooziness: number = 10;
    public starviness: number = 10;
    
    constructor(name: string, traits: any[]) {
        this.name = name;
        this.gender = traits[0];
        this.skinColor = traits[1];
        this.hairColor = traits[2];
        this.eyeColor = traits[3];
    }
}