import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ShoppingListService {

    private ingredients: Ingredient[] = [new Ingredient('Apple', 5), new Ingredient('Tomato', 10)];
    public onIngredientAdd = new EventEmitter<Ingredient[]>();
    public onIngredientSelect = new Subject<number>();

    getIngredients() {
        return this.ingredients;
    }

    getIngredientAtIndex(index) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.onIngredientAdd.emit(this.ingredients);
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
    }

    selectedIngredient(index: number) {
        this.onIngredientSelect.next(index);
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
    }

    updateIngredient(ingredient: Ingredient, index: number) {
        this.ingredients[index] = ingredient;
    }

}
