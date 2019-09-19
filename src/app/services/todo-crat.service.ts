import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoCRUTService {

  envUrl = environment.url;

  constructor(private http: HttpClient) { }

  putTodo(url: string, body: any): Observable<any> {
    return this.http.post<any>(`${this.envUrl}${url}`, body)
  }
  getTodoS(url: string): Observable<any> {
    return this.http.get<any>(`${this.envUrl}${url}`)
  }

  getOne(url:string):Observable<any>{
    return this.http.get<any>(`${this.envUrl}${url}`)
  }


}
