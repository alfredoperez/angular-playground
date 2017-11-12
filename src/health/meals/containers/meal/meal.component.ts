import 'rxjs/add/operator/switchMap';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Meal, MealsService } from '../../../../shared/services/meals/meals.service';

@Component({
  selector: 'ngx-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {
  meal$: Observable<Meal>;
  subscription: Subscription;
  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.mealsService
      .meals$
      .subscribe();

    this.meal$ = this.route.params
      .switchMap(param => this.mealsService.getMeal(param.id));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addMeal(event: Meal): Promise<any> {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  async updateMeal(event: Meal): Promise<any> {
    const key = this.route.snapshot.params.id;
    await this.mealsService.updateMeal(key, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal): Promise<any> {
    const key = this.route.snapshot.params.id;
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals(): void {
    this.router.navigate(['meals']);
  }

}
