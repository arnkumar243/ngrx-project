import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private router: ActivatedRoute,
              private shoppingListService: ShoppingListService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.id = +this.router.snapshot.params.id;
    this.recipe = this.recipeService.getRecipes()[this.id];
    this.router.params.subscribe((params: Params) => {
      const id = +params.id;
      this.recipe = this.recipeService.getRecipes()[id];
    });
    console.log(this.recipe);
  }

  addIngredientsToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
    this.route.navigate(['shopping-list']);
  }

}
