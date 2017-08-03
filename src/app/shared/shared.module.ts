import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { HorizontalVirtualScrollComponent } from './horizontal-virtual-scroll/horizontal-virtual-scroll.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';


@NgModule({
    imports: [ CommonModule ],
    declarations: [
        LoadingOverlayComponent,
        VirtualScrollComponent,
        HorizontalVirtualScrollComponent
    ],
    exports: [
        LoadingOverlayComponent,
        VirtualScrollComponent,
        HorizontalVirtualScrollComponent
    ]
})
export class SharedModule { }