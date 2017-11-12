import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
  toggled = false;

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter();

  getRoute(item: any): any {
    return [
      `../${item.ingredients ? 'meals' : 'workouts'}`,
      item.$key
    ];
  }
  removeItem(): void {
    this.remove.emit(this.item);
  }
  toggle(): void {
    this.toggled = !this.toggled;
  }
}
