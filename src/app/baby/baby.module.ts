import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

//Services

import { BabyCareComponent } from './baby-care/baby-care.component';
import { BabyComponent } from './baby.component';
import { BabyGeneratorComponent } from './baby-generator/baby-generator.component';
import { BabySelectorComponent } from './baby-selector/baby-selector.component';
import { BabyTraitComponent } from './baby-generator/baby-trait/baby-trait.component';

//Models

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        BabyCareComponent,
        BabyComponent,
        BabyGeneratorComponent,
        BabySelectorComponent,
        BabyTraitComponent
    ]
})
export class BabyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BabyModule,
            providers: [
                //Services
            ]
        }
    }
}