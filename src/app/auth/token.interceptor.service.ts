import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authenticationService.userSubject.pipe(take(1), exhaustMap( user => {
            if (user == null || req.url.includes('v1/accounts')) {
                return next.handle(req);
            }
            const clonedRequest = req.clone({params: req.params.append('auth', user._token)});
            return next.handle(clonedRequest);
        }));
    }

}
