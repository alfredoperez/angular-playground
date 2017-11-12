import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { Workout, WorkoutsService } from '../../../../shared/services/workouts/workouts.service';
import { Store } from '../../../../store';

@Component({
  selector: 'ngx-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {

  workouts$: Observable<Array<Workout>>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private workoutsService: WorkoutsService
  ) { }

  ngOnInit(): void {
    this.workouts$ = this.store.select<Array<Workout>>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout): void {
    this.workoutsService.removeWorkout(event.$key);
  }

}
