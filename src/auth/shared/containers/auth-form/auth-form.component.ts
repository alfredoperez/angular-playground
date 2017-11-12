import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  onSubmit(): void {
    if (this.form.valid)
      this.submitted.emit(this.form);

  }

  get passwordInvalid(): boolean {
    const control = this.form.get('password');

    return control.hasError('required') && control.touched;
  }
  get emailFormat(): boolean {
    const control = this.form.get('email');

    return control.hasError('email') && control.touched;
  }
}
