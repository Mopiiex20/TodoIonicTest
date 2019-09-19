import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    envUrl = environment.url;

    constructor(private http: HttpClient) { }



    getUser(_id: string): Observable<any> {
        return this.http.get<any>(`${this.envUrl}users/${_id}`)
    }


}