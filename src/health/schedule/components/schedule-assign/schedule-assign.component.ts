import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Meal } from '../../../../shared/services/meals/meals.service';
import { Workout } from '../../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'ngx-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleAssignComponent implements OnInit {

  @Input()
  section: any;

  @Input()
  list: Array<Meal> | Array<Workout>;

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  private selected: Array<string> = [];

  ngOnInit(): void {
    this.selected = [...this.section.assigned];
  }

  toggleItem(name: string): void {
    this.selected = this.exists(name)
      ? this.selected.filter(item => item !== name)
      : this.selected = [...this.selected, name];
  }

  getRoute(name: string): any {

    return [`../${name}/new`];
  }

  exists(name: string): boolean {
    // tslint:disable-next-line:no-bitwise
    return !!~this.selected.indexOf(name);
  }

  updateAssign(): void {
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelAssign(): void {
    this.cancel.emit();
  }

}
