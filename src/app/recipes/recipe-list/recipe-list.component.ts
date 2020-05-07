import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  private recipesSubscription: Subscription;

  constructor(private recipeService: RecipeService) {
    this.recipes = recipeService.getRecipes();
  }

  ngOnInit(): void {
    this.recipesSubscription = this.recipeService.recipesUpdated.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

}
