import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  ingredient = {name: '', amount: 0};

  editMode = false;
  selectedIngredientIndex: number;
  selectedIngredient: Ingredient;

  @ViewChild('f', {static: false}) ingredientForm: NgForm;


  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.onIngredientSelect.subscribe(
      (index: number) => {
        this.editMode = true;
        this.selectedIngredientIndex = index;
        this.selectedIngredient = this.shoppingListService.getIngredientAtIndex(index);
        this.ingredientForm.setValue({
          name: this.selectedIngredient.name,
          amount: this.selectedIngredient.amount
        });
      }
    );
  }

  ngOnInit(): void {
  }

  onAddIngredient(formData: NgForm) {
    // tslint:disable-next-line: max-line-length
    const newIngredient = new Ingredient(formData.value.name, formData.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(newIngredient, this.selectedIngredientIndex);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    formData.reset();
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedIngredientIndex);
    this.onClear();
  }

}
