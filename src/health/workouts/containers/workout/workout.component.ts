import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Workout, WorkoutsService } from '../../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'ngx-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {

  workout$: Observable<Workout>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params
      .switchMap(param => this.workoutsService.getWorkout(param.id));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addWorkout(event: Workout): Promise<any> {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout): Promise<any> {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout(event: Workout): Promise<any> {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts(): void {
    this.router.navigate(['workouts']);
  }

}
