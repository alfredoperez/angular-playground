import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDaysComponent {
  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  @Input()
  selected: number;

  @Output()
  select = new EventEmitter<number>();

  selectDay(index: number): void {
    this.select.emit(index);
  }
}
