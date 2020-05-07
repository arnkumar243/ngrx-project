import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthenticationService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
    collapsed = true;
    loggedIn = false;

    constructor(private recipeService: RecipeService, private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.authenticationService.userSubject.subscribe(user => {
            this.loggedIn = !!user;
        });
    }

    onSaveData() {
        this.recipeService.saveRecipes().subscribe();
    }

    onFetchData() {
        this.recipeService.getRecipesFromFireBase().subscribe();
    }

    logout() {
        this.authenticationService.logout();
    }

}
