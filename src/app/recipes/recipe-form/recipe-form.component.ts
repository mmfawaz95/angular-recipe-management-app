import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { Recipe } from '../../models/recipe.model';
import { Category } from '../../models/category.model';
@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.sass'],
  standalone:false
})
export class RecipeFormComponent implements OnInit {
  recipe: Recipe = {
    id: 0,
    title: '',
    description: '',
    ingredients: [],
    steps: [],
    categoryId: 1,
    userId: 0,
    bookmarked: false
  };
  
  isEditMode = false;
  ingredientsInput = '';
  stepsInput = '';
  
  categories: Category[] = [
    { id: 1, name: 'Dessert' },
    { id: 2, name: 'Main Course' },
    { id: 3, name: 'Appetizer' },
    { id: 4, name: 'Drink' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundRecipe = this.recipeService.getRecipeById(Number(id));
      if (foundRecipe) {
        this.recipe = { ...foundRecipe };
        this.isEditMode = true;
        this.ingredientsInput = this.recipe.ingredients.join(', ');
        this.stepsInput = this.recipe.steps.join(', ');
      }
    }
  }

  saveRecipe() {
    if (!this.validateForm()) {
      alert('Please fill all required fields');
      return;
    }

    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.recipe);
    } else {
      this.recipe.userId = this.authService.getCurrentUserId();
      this.recipeService.addRecipe(this.recipe);
    }
    this.router.navigate(['/recipes']);
  }

  onIngredientsChange(value: string) {
    this.recipe.ingredients = value.split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0);
  }

  onStepsChange(value: string) {
    this.recipe.steps = value.split(',')
      .map(step => step.trim())
      .filter(step => step.length > 0);
  }

  private validateForm(): boolean {
    return !!this.recipe.title && 
           !!this.recipe.description &&
           this.recipe.ingredients.length > 0 &&
           this.recipe.steps.length > 0;
  }
}