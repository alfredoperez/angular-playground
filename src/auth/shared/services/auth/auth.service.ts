import 'rxjs/add/operator/do';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { Store } from '../../../../store';

export interface User {
    email: string;
    uid: string;
    authenticated: boolean;
}
@Injectable()
export class AuthService {
    auth$ = this.af.authState
        .do(next => {
            if (!next) {
                this.store.set('user', undefined);

                return;
            }
            const user: User = {
                email: next.email,
                uid: next.uid,
                authenticated: true
            };
            this.store.set('user', user);
        });

    constructor(
        private af: AngularFireAuth,
        private store: Store
    ) { }

    createUser(email: string, password: string): any {
        return this.af.auth
            .createUserWithEmailAndPassword(email, password);
    }
    loginUser(email: string, password: string): any {
        return this.af.auth
            .signInWithEmailAndPassword(email, password);
    }

    logoutUser(): any {
        return this.af.auth.signOut();
    }

    get authState(): any {
        return this.af.authState;
    }

    get user(): any {
        return this.af.auth.currentUser;
    }

}
