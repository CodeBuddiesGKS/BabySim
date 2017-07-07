import { EyeColor } from './eye-color';
import { Gender } from './gender';
import { HairColor } from './hair-color';
import { SkinColor } from './skin-color';

export class Baby {
    public age: number = 0;
    public eyeColor: EyeColor;
    public gender: Gender;
    public hairColor: HairColor;
    public hunger: number = 0;
    public name: string;
    public shittiness: number = 0;
    public skinColor: SkinColor;
    public sleepiness: number = 0;
    
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