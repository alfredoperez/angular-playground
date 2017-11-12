import { ScheduleAssignComponent } from './components/schedule-assign/schedule-assign.component';
import { SharedModule } from '../../shared/shared.module';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './containers/schedule.component';
export const ROUTES: Routes = [
  {
    path: '', component: ScheduleComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleControlsComponent,
    ScheduleDaysComponent,
    ScheduleSectionComponent,
  ScheduleAssignComponent]
})
export class ScheduleModule { }