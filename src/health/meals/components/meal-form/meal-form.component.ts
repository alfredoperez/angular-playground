import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Meal } from '../../../../shared/services/meals/meals.service';

@Component({
  selector: 'ngx-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent implements OnChanges {
  toggled = false;
  exists = false;

  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(
    private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.meal && this.meal.name) {
      this.exists = true;
      const value = this.meal;
      this.form.patchValue(value);
      this.emptyIngredients();
      if (value.ingredients)
        for (const item of value.ingredients)
          this.ingredients.push(new FormControl(item));
    }
  }

  createMeal(): void {
    if (this.form.valid)
      this.create.emit(this.form.value);

  }
  removeMeal(): void {
    if (this.form.valid)
      this.remove.emit(this.form.value);

  }
  updateMeal(): void {
    if (this.form.valid)
      this.update.emit(this.form.value);

  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }
  addIngredient(): void {
    this.ingredients.push(new FormControl(''));
  }
  toggle(): void {
    this.toggled = !this.toggled;
  }
  private emptyIngredients(): void {
    while (this.ingredients.controls.length)
      this.ingredients.removeAt(0);

  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get required(): boolean {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

}
