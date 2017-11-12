import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { ScheduleItem, ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';
import { Store } from '../../../store';

@Component({
  selector: 'ngx-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  open = false;

  date$: Observable<Date>;
  schedule$: Observable<Array<ScheduleItem>>;
  selected$: Observable<any>;
  list$: Observable<Array<Meal> | Array<Workout>>;
  subscriptions: Array<Subscription> = [];

  constructor(
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workousService: WorkoutsService,
    private store: Store) {

  }

  ngOnInit(): void {

    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workousService.workouts$.subscribe()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  changeDate(date: Date): void {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any): void {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  closeAssign(): void {
    this.open = false;
  }

  assignItem(items: Array<string>): void {
    this.scheduleService.updateItems(items);
    this.closeAssign();

  }

}
