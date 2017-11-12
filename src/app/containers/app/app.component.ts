import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';

import { AuthService, User } from '../../../auth/shared/services/auth/auth.service';
import { Store } from '../../../store';

@Component({
  selector: 'ngx-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <ngx-header>
            [user]="user$ | async"
            (logout)="onLogout()">
      </ngx-header>
      <ngx-nav *ngIf="(user$|async)?.authenticated">
      </ngx-nav>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subscription: Subscription;
  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }
  async onLogout(): Promise<any> {
    await this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
