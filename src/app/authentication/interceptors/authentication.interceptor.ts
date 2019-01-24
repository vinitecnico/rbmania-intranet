import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(@Inject('LocalStorage') localStorage, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const auth = localStorage.getItem('authData');
        const authObj = JSON.parse(auth);
        const isTokenValid = this.validateAuthenticationToken(authObj);

        if (request.url.indexOf('api/login') > -1) {
            return next.handle(request);
        }

    //    if (isTokenValid) {
    //         if (!request.headers.has('authorization')) {
    //             request = request.clone({ headers: request.headers.set('authorization', `Bearer ${authObj.token}`) });
    //         }

    //         if (!request.headers.has('content-Type')) {
    //             request = request.clone({ headers: request.headers.set('content-Type', 'application/json') });
    //         }

    //         // setting the accept header
    //         if (!request.headers.has('accept')) {
    //             request = request.clone({ headers: request.headers.set('accept', 'application/json') });
    //         }

    //         // send the newly created request
    //         return next.handle(request)
    //             .pipe(
    //                 catchError(error => {
    //                     // checks if a url is to an admin api or not
    //                     if (error.status === 401 || error.status === 403) {
    //                         // attempting to refresh our token
    //                         localStorage.removeItem('authData');
    //                         this.router.navigateByUrl('/login');
    //                     }
    //                     return throwError(error);
    //                 }));
    //     }

    //     if (authObj != null && !isTokenValid) {
    //         this.router.navigateByUrl('/login');
    //     }

        return next.handle(request);
    }

    validateAuthenticationToken(authData): boolean {
        if (!authData) {
            return false;
        }

        return true;
    }
}
