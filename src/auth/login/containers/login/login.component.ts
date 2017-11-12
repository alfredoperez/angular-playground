import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async loginUser(event: FormGroup): Promise<any> {
    const { email, password } = event.value;
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = err.message;
    }
  }
}
