import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    envUrl = environment.url;
    authState = new BehaviorSubject(false);

    constructor(private http: HttpClient, public storage: Storage, public platform: Platform) {
        this.platform.ready().then(() => {
            this.isLoggedIn();
        });
    }

    isLoggedIn() {
        this.storage.get('token').then((response) => {
            if (response) {
                this.authState.next(true);
            }
        });
    }


    isAuthenticated() {
        return this.authState.value
    }


    auth(url: string, body: any): Observable<any> {
        return this.http.post<any>(`${this.envUrl}${url}`, body)
    }


}
