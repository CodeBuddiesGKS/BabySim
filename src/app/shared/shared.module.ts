import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        LoadingOverlayComponent,
    ],
    exports: [
        LoadingOverlayComponent,
    ]
})
export class SharedModule { }