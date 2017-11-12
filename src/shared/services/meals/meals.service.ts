import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../../auth/shared/services/auth/auth.service';
import { Store } from '../../../store';

export interface Meal {
    name: string;
    ingredients: Array<string>;
    timestamp: number;
    $key: string;
    $exists(): boolean;
}

@Injectable()
export class MealsService {

    meals$ = this.db.list(`meals/${this.uid}`)
        .valueChanges()
        .do(next => this.store.set('meals', next));

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) { }

    getMeal(key: string): any {
        if (!key)
            return Observable.of({});

        return this.store.select<Array<Meal>>('meals')
            .filter(Boolean)
            .map(meals =>
                meals.find((meal: Meal) => meal.$key === key)
            );
    }

    addMeal(meal: Meal): any {

        return this.db.list(`meals/${this.uid}`)
            .push(meal);
    }

    removeMeal(key: string): any {

        return this.db.list(`meals/${this.uid}`)
            .remove(key);
    }

    updateMeal(key: string, meal: Meal): any {

        return this.db.object(`meals/${this.uid}/${key}`)
            .update(meal);
    }

    get uid(): any {
        return this.authService.user.uid;
    }
}
