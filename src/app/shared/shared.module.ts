import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        LoadingOverlayComponent,
        VirtualScrollComponent,
    ],
    exports: [
        LoadingOverlayComponent,
        VirtualScrollComponent,
    ]
})
export class SharedModule { }