import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    envUrl = environment.url;
    authState = new BehaviorSubject(false);

    constructor(
        private http: HttpClient,
        public storage: Storage,
        public platform: Platform,
        private router: Router
    ) {
        this.platform.ready().then(() => {
            this.isLoggedIn();
        });
    }
    public async logout() {
        await this.storage.clear()
        this.authState.next(false);

    }

    isLoggedIn() {
        this.storage.get('token').then((response) => {
            if (response) {
                this.authState.next(true);
            }
        });
    }

    async getToken() {
        let token = ''
        await this.storage.get('token').then(
            data => token = data
        )
        return token
    }

    isAuthenticated() {
        return this.authState.value
    }

    async completeSignIn(accessToken: string): Promise<void> {
        await this.storage.set('token', accessToken);
        await this.authState.next(true);
        await this.router.navigate(['todolist']);
    }

    auth(url: string, body: any): Observable<any> {
        return this.http.post<any>(`${this.envUrl}${url}`, body)
    }


}
