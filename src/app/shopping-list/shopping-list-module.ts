import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const shoppingListRoutes: Routes = [
    {path: '', component: ShoppingListComponent}
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [CommonModule, FormsModule, RouterModule.forChild(shoppingListRoutes)]
})
export class ShoppingListModule {}
