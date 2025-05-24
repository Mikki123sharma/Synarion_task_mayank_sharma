import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (typeof sessionStorage !== 'undefined') {
            var authToken = sessionStorage.getItem('authToken');
        }
        const modifiedReq = authToken
            ? req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })
            : req;

        return this.checkInternetConnectivity().pipe(
            switchMap((isConnected: boolean) => {
                if (!isConnected) {
                    return throwError(() =>
                        new HttpErrorResponse({
                            error: 'Network error. Please check your internet connection.',
                            status: 0,
                            statusText: 'Offline'
                        })
                    );
                }

                return next.handle(modifiedReq).pipe(
                    catchError((error: HttpErrorResponse) => {
                        console.error('HTTP Error:', error);
                        return throwError(() => error);
                    })
                );
            })
        );
    }

    checkInternetConnectivity(): Observable<boolean> {
        if (typeof window !== 'undefined') {
            return of(window.navigator.onLine);
        }
    }
}
