import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeResolver implements Resolve<Observable<any>> {
    constructor(private recipeService: RecipeService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.recipeService.getRecipesFromFireBase();
    }
}
