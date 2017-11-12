import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';
import { Store } from '../store';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { AppComponent } from './containers/app/app.component';

export const COMPONENTS = [
  AppHeaderComponent,
  AppNavComponent

];

export const ROUTES: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'schedule'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    HealthModule
  ],
  declarations: [
    AppComponent,
    ...COMPONENTS
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
