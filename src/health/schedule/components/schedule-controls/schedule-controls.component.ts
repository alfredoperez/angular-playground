import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./schedule-controls.component.scss']
})
export class ScheduleControlsComponent {
  offset = 0;

  @Input()
  selected: Date;

  @Output()
  move = new EventEmitter<number>();

  moveDate(offset: number): void {
    this.offset = offset;
    this.move.emit(this.offset);
  }

}
