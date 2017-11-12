import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { MealComponent } from './containers/meal/meal.component';
import { MealsComponent } from './containers/meals/meals.component';

export const ROUTES: Routes = [
    { path: '', component: MealsComponent },
    { path: 'new', component: MealComponent },
    { path: ':id', component: MealComponent }
];
export const COMPONENTS = [
    MealsComponent,
    MealComponent,
    MealFormComponent];
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ],
    exports: [],
    declarations: [...COMPONENTS],
    providers: [],
})
export class MealsModule { }
