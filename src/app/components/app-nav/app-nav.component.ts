import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ngx-nav',
    templateUrl: './app-nav.component.html',
    styleUrls: ['./app-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavComponent { }
