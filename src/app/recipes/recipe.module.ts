import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { NoRecipeComponent } from './no-recipe/no-recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        NoRecipeComponent,
    ],
    imports: [
        RecipeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})

export class RecipeModule {}
