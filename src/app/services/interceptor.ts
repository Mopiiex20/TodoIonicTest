import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router, ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        if (request.urlWithParams) {
            let token = this.authService.getToken()
            request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            });
        }
        if (request.method === 'DELETE') {
            let token = this.authService.getToken()
            request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });


        return next.handle(request).pipe(

            map((event: HttpEvent<any>) => {

                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 500) {
                    this.router.navigate(["home"])
                }
                let data = {};
                data = {
                    reason: error.message,
                    status: error.status
                };
                return throwError(data);
            })
        );
    }
}