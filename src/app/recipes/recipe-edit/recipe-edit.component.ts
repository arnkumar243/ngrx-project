import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  isEditMode = false;
  recipe: Recipe;
  recipeForm: FormGroup;
  id: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (!isNaN(this.id)) {
        this.isEditMode = true;
        this.recipe = this.recipeService.getRecipeById(this.id);
      } else {
        this.isEditMode = false;
      }
      this.initRecipeForm();
    });
  }

  initRecipeForm() {

    let recipeName = '';
    let url = '';
    let description = '';
    const ingredients = new FormArray([]);

    if (this.isEditMode) {
      recipeName =  this.recipe.name;
      url = this.recipe.url;
      description = this.recipe.description;

      this.recipe.ingredients.forEach(ingredient => {
        ingredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, Validators.required)
          })
        );
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      url: new FormControl(url, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients
    });
  }

  getIngredientsControl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    }));
  }

  deleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    if (!this.isEditMode) {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.router.navigate(['/recipes']);
    } else {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
  }

}
