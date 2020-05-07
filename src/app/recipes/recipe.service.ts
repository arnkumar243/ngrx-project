import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RecipeService {

    private fireBaseUrl = 'https://fir-c3f77.firebaseio.com/recipes.json';
    private recipes: Recipe[] = [];

    public onSelectedRecipe = new EventEmitter<Recipe>();
    public recipesUpdated = new Subject<Recipe[]>();

    constructor(private httpService: HttpClient) {}

    getRecipes() {
        return this.recipes;
    }

    set selectedRecipe(recipe: Recipe) {
        this.onSelectedRecipe.emit(recipe);
    }

    getRecipeById(id) {
        return this.recipes.slice()[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
    }

    saveRecipes() {
        return this.httpService.put(this.fireBaseUrl, this.recipes);
    }

    getRecipesFromFireBase() {
        return this.httpService.get<Recipe[]>(this.fireBaseUrl)
        .pipe(tap(response => {
            this.recipes = response;
            this.recipesUpdated.next(this.recipes);
        }));
    }

}
