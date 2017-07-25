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
import { EndlessListComponent } from './endless-list/endless-list.component';

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
        EndlessListComponent,
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