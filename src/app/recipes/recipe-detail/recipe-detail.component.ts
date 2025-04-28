import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Category } from '../../models/category.model';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass'],
  standalone: false
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  categories: Category[] = [
    { id: 1, name: 'Dessert' },
    { id: 2, name: 'Main Course' },
    { id: 3, name: 'Appetizer' },
    { id: 4, name: 'Drink' }
  ];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    public router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const foundRecipe = this.recipeService.getRecipeById(id);
    
    if (!foundRecipe) {
      this.router.navigate(['/recipes']);
      return;
    }
    
    this.recipe = foundRecipe;
  }

  toggleBookmark() {
    if (this.recipe) {
      this.recipe.bookmarked = !this.recipe.bookmarked;
      this.recipeService.updateRecipe(this.recipe);
    }
  }

  editRecipe() {
    if (this.recipe) {
      this.router.navigate(['/recipes/edit', this.recipe.id]);
    }
  }

  deleteRecipe() {
    if (this.recipe && confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(this.recipe.id);
      this.router.navigate(['/recipes']);
    }
  }

  getCategoryName(): string {
    if (!this.recipe) return '';
    const category = this.categories.find(c => c.id === this.recipe?.categoryId);
    return category?.name || 'Unknown';
  }
}