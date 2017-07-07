import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BabyComponent } from './baby/baby.component';

const routes: Routes = [
    {
        path: '',
        component: BabyComponent
    },
    {
        path: '**',
        component: BabyComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }