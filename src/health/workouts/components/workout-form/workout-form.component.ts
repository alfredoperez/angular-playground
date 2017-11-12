import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Workout } from '../../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'ngx-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnChanges {

  toggled = false;
  exists = false;

  @Input()
  workout: Workout;

  @Output()
  create = new EventEmitter<Workout>();

  @Output()
  update = new EventEmitter<Workout>();

  @Output()
  remove = new EventEmitter<Workout>();

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['strength', Validators.required],
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workout && this.workout.name) {
      this.exists = true;
      const value = this.workout;
      this.form.patchValue(value);
    }
  }

  get required(): boolean {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }
  get placeholder(): string {
    return `e.g. ${this.form.get('type').value === 'strength' ? 'Benhpress' : 'Treadmill'}`;
  }
  createWorkout(): void {
    if (this.form.valid)
      this.create.emit(this.form.value);

  }

  updateWorkout(): void {
    if (this.form.valid)
      this.update.emit(this.form.value);

  }

  removeWorkout(): void {
    this.remove.emit(this.form.value);
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }

}
