import { AuthGuard } from './guards/auth.guard';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormComponent } from './containers/auth-form/auth-form.component';
import { AuthService } from './services/auth/auth.service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    exports: [AuthFormComponent],
    declarations: [AuthFormComponent]

})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthService,
                AuthGuard
            ]
        }
    }
}
