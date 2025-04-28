import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { Category } from '../../models/category.model';

interface RecipeWithCategoryName extends Recipe {
  categoryName: string;
}

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass'],
  standalone: false
})
export class RecipeListComponent implements OnInit {
  searchQuery = '';
  selectedCategory: number | undefined;
  recipes: RecipeWithCategoryName[] = [];
  filteredRecipes: RecipeWithCategoryName[] = [];
  loading = false;
  
  categories: Category[] = [
    { id: 1, name: 'Dessert' },
    { id: 2, name: 'Main Course' },
    { id: 3, name: 'Appetizer' },
    { id: 4, name: 'Drink' }
  ];

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.loading = true;
    const userId = this.authService.getCurrentUserId();
    
    try {
      const recipes = this.recipeService.getRecipesByUser(userId);
      this.recipes = recipes.map(recipe => ({
        ...recipe,
        categoryName: this.getCategoryName(recipe.categoryId)
      }));
      this.filteredRecipes = [...this.recipes];
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      this.loading = false;
    }
  }

  applyFilters(): void {
    const userId = this.authService.getCurrentUserId();
    const filtered = this.recipeService.searchRecipes(
      userId,
      this.searchQuery,
      this.selectedCategory
    );
    
    this.filteredRecipes = filtered.map(recipe => ({
      ...recipe,
      categoryName: this.getCategoryName(recipe.categoryId)
    }));
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.name || 'Other';
  }

  viewRecipe(recipeId: number): void {
    this.router.navigate(['/recipes/detail', recipeId]);
  }
  toggleBookmark(recipeId: number, event: Event): void {
    event.stopPropagation();
    this.recipeService.toggleBookmark(recipeId);
    this.loadRecipes();
  }

  addRecipe(): void {
    this.router.navigate(['/recipes/add']);
  }

  deleteRecipe(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id);
      this.loadRecipes();
    }
  }

  trackByRecipeId(index: number, recipe: Recipe): number {
    return recipe.id;
  }
}