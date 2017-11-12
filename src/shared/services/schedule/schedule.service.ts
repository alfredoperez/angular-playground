import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';

import { AuthService } from '../../../auth/shared/services/auth/auth.service';
import { Store } from '../../../store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';

export interface ScheduleItem {
    meals: Array<Meal>;
    workouts: Array<Workout>;
    section: string;
    timestamp: number;
    $key?: string;
}
export interface ScheduleList {
    morning?: ScheduleItem;
    evening?: ScheduleItem;
    lunch?: ScheduleItem;
    snack?: ScheduleItem;
    [key: string]: any;
}
@Injectable()
export class ScheduleService {
    date$ = new BehaviorSubject(new Date());
    section$ = new Subject();
    itemsList$ = new Subject();

    items$ = this.itemsList$
        .withLatestFrom(this.section$)
        .map(([items, section]: Array<any>) => {
            const id = section.data.$key;
            const defaults: ScheduleItem = {
                workouts: undefined,
                meals: undefined,
                section: section.section,
                timestamp: new Date(section.day).getTime()

            };
            const payload = {
                ...(id ? section.data : defaults),
                ...items
            };
            if (id)
                return this.updateSection(id, payload);
            else
                return this.createSection(payload);

        });
    selected$ = this.section$
        .do((next: any) => {
            this.store.set('selected', next);
        });

    list$ = this.section$
        .map((value: any) => this.store.value[value.type])
        .do((next: any) => this.store.set('list', next));

    schedule$: Observable<Array<ScheduleItem>> = this.date$
        .do((next: any) => this.store.set('date', next))
        .map((day: any) => {
            const startAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate())
            ).getTime();
            const endAt = (
                new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
            ).getTime() - 1;

            return { startAt, endAt };
        })
        .switchMap(({ startAt, endAt }: any) => {

            return this.getSchedule(startAt, endAt);
        })
        .map((data: any) => {

            const mapped: ScheduleList = {};
            for (const prop of data)
                if (!mapped[prop.section])
                    mapped[prop.section] = prop;

            return mapped;
        })
        .do((next: any) => this.store.set('schedule', next));

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) { }

    get uid(): any {
        return this.authService.user.uid;
    }

    updateDate(date: Date): void {
        this.date$.next(date);
    }

    selectSection(event: any): void {
        this.section$.next(event);
    }

    updateItems(items: Array<string>): void {
        this.itemsList$.next(items);
    }

    private getSchedule(startAt: number, endAt: number): any {
        return this.db.list(`schedule/${this.uid}`, ref =>
            ref.orderByChild('timestamp')
                .startAt(startAt)
                .endAt(endAt)
        ).valueChanges();
    }

    private updateSection(key: string, payload: ScheduleItem): any {
        return this.db.object(`schedule/${this.uid}/${key}`)
            .update(payload);
    }

    private createSection(payload: ScheduleItem): any {
        return this.db.list(`schedule/${this.uid}`)
            .push(payload);
    }

}
