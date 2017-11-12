import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../../auth/shared/services/auth/auth.service';
import { Store } from '../../../store';

export interface Workout {
    name: string;
    type: string;
    strength: any;
    endurance: any;
    timestamp: number;
    $key: string;
    $exists(): boolean;
}
@Injectable()
export class WorkoutsService {

    workouts$ = this.db.list(`workouts/${this.uid}`)
        .valueChanges()
        .do(next => this.store.set('workouts', next));

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) { }

    getWorkout(key: string): Observable<any> {
        if (!key)
            return Observable.of({});

        return this.store.select<Array<Workout>>('workouts')
            .filter(Boolean)
            .map(workouts =>
                workouts.find((workout: Workout) => workout.$key === key)
            );
    }

    addWorkout(workout: Workout): any {

        return this.db.list(`workouts/${this.uid}`)
            .push(workout);
    }

    removeWorkout(key: string): any {

        return this.db.list(`workouts/${this.uid}`)
            .remove(key);
    }

    updateWorkout(key: string, workout: Workout): any {

        return this.db.object(`workouts/${this.uid}/${key}`)
            .update(workout);
    }

    get uid(): any {
        return this.authService.user.uid;
    }

}
