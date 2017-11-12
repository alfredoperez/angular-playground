import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { User } from './auth/shared/services/auth/auth.service';
import { Meal } from './shared/services/meals/meals.service';
import { ScheduleItem } from './shared/services/schedule/schedule.service';
import { Workout } from './shared/services/workouts/workouts.service';

export interface State {
  user: User,
  meals: Meal[],
  schedule: ScheduleItem[],
  date: Date,
  workouts: Workout[],
  selected: any,
  list: any,
  [key: string]: any
}

const state: State = {
  user: undefined,
  meals: undefined,
  schedule: undefined,
  date: undefined,
  selected: undefined,
  list: undefined,
  workouts: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }

  set(name: string, state: any) {
    console.log(`Name: ${name}, State: ${state}`);
    this.subject.next({ ...this.value, [name]: state });
  }

}
