import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ScheduleItem } from '../../../../shared/services/schedule/schedule.service';

@Component({
  selector: 'ngx-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleSectionComponent {

  @Input()
  name: string;

  @Input()
  section: ScheduleItem;

  @Output()
  select = new EventEmitter<any>();

  onSelect(type: string, assigned: Array<string> = []): void {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    });
  }

}
