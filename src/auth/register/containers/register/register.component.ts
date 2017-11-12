import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  error: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async registerUser(event: FormGroup): Promise<any> {
    const { email, password } = event.value;
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = err.message;
    }

  }
}
