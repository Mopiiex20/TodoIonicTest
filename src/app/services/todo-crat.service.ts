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

  postTodo(url: string, body: any): Observable<any> {

    return this.http.post<any>(`${this.envUrl}${url}`, body)
  }

  putTodo(todoId: string, body: any): Observable<any> {

    return this.http.put<any>(`${this.envUrl}content/${todoId}`, body)
  }

  getTodoS(url: string): Observable<any> {
    return this.http.get<any>(`${this.envUrl}${url}`)
  }

  getOne(url: string): Observable<any> {
    return this.http.get<any>(`${this.envUrl}${url}`)
  }

  deleteTODO(id: string) {
    return this.http.delete(`${this.envUrl}content/${id}`)
  }

}
