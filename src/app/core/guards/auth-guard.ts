import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public auth: AuthService, public router: Router) { }

    canActivate(): boolean {
        console.log(this.auth.isAuthenticated());

        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['home']);
            return false;
        } else {
            // this.router.navigate(['todolist']);
            return true;
        }

    }
}