import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BabyComponent } from './baby/baby.component';
import { EndlessListComponent } from './baby/endless-list/endless-list.component';

const routes: Routes = [
    {
        path: '',
        component: BabyComponent
    },
    {
        path: 'scroll',
        component: EndlessListComponent
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