import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeActivate } from './recipe-activate.route.service';
import { NoRecipeComponent } from './no-recipe/no-recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipeRoutes: Routes = [
    {path: '', component: RecipesComponent, canActivate: [RecipeActivate], children: [
        {path: '', component: NoRecipeComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: RecipeEditComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {}
