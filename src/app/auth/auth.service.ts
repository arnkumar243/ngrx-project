import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
    private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';

    public userSubject = new BehaviorSubject<User>(null);
    private logoutTimer: any;

    constructor(private httpClient: HttpClient, private router: Router) { }

    signUp(input: {email: string, password: string}) {
        const inputData = { ...input, returnSecureToken: true };
        const params = new HttpParams().append('key', 'AIzaSyBwBZ3X_YAARihb0ILVs1XoPUl-om_Bl30');
        return this
            .httpClient
            .post<AuthResponse>(this.signUpUrl, inputData, { params })
            .pipe(catchError(this.handleError), tap(usr => {
                const user = new User(usr.email, usr.idToken, usr.localId, new Date(new Date().getTime() + +usr.expiresIn * 1000).getTime());
                this.userSubject.next(user);
                localStorage.setItem('userData', JSON.stringify(user));
            }));
    }

    login(input: {email: string, password: string}) {
        const inputData = { ...input, returnSecureToken: true };
        const params = new HttpParams().append('key', 'AIzaSyBwBZ3X_YAARihb0ILVs1XoPUl-om_Bl30');
        return this.httpClient
            .post<AuthResponse>(this.loginUrl, inputData, { params })
            .pipe(catchError(this.handleError), tap(usr => {
                const user = new User(usr.email, usr.idToken, usr.localId, new Date(new Date().getTime() + +usr.expiresIn * 1000).getTime());
                this.userSubject.next(user);
                localStorage.setItem('userData', JSON.stringify(user));
            }));
    }

    logout() {
        this.userSubject.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
            this.logoutTimer = null;
        }
    }

    autoLogout(expiry: number) {
        this.logoutTimer = setTimeout(() => {
            this.logout();
            localStorage.removeItem('userData');
        }, expiry);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        console.log(errorResponse);
        let errorMessage: string;
        if (errorResponse.error != null && errorResponse.error.error != null && errorResponse.error.error.message != null) {
            errorMessage = errorResponse.error.error.message;
            switch (errorMessage) {
                case 'MISSING_EMAIL': errorMessage = 'Email id is missing.'; break;
                case 'EMAIL_NOT_FOUND': errorMessage = 'Email Id Not found.'; break;
                case 'INVALID_PASSWORD': errorMessage = 'Invalid Password.'; break;
                case 'USER_DISABLED': errorMessage = 'User Disabled.'; break;
                case 'PASSWORD_LOGIN_DISABLED': errorMessage = 'User does not exists.'; break;
                default: errorMessage = 'An unexpected error occured.';
            }
        } else {
            errorMessage = 'An unknown error occured.';
        }
        return throwError(errorMessage);
    }

}

interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}
