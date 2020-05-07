import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
import { take, exhaustMap, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecipeActivate implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
        return this.authenticationService.userSubject.pipe(take(1), map(user => {
            if (!!user) {
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }));
    }
}
