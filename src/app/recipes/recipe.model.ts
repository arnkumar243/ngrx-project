import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public url: string;
    public ingredients: Ingredient[];

    constructor(name: string, description: string, url: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.ingredients = ingredients;
    }
}