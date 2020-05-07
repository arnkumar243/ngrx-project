import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'recipes'},
    {path: 'recipes', loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipeModule)},
    {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list-module').then(m => m.ShoppingListModule)},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {enableTracing: true,  useHash: true, preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})

export class AppRoutingModule {}
