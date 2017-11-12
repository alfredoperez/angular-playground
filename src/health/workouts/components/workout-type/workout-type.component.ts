import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms/src/directives';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // TODO : Remove ForwardRef()
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};

@Component({
  selector: 'ngx-workout-type',
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss'],
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutTypeComponent implements ControlValueAccessor {
  value: string;
  selectors = ['strength', 'endurance'];

  private onTouch: Function;
  private onModelChange: Function;

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Not implemented yet.');
  }

  setSelected(value: string): void {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }
}
