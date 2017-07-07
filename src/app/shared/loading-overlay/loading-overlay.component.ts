import { Component } from '@angular/core';

import { AppService } from '../../core/app.service';

@Component({
    selector: 'loading-overlay',
    templateUrl: './loading-overlay.component.html',
    styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent {
    public loading: boolean = false;
    
    constructor(appService: AppService) {
        appService.loading.subscribe((isLoading) => {
            this.loading = isLoading;
        });
    }
}