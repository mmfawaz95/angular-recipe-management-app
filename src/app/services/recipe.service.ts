import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesKey = 'recipes';

  constructor() {}

  getRecipesByUser(userId: number): Recipe[] {
    const recipes = this.getAllRecipes();
    return recipes.filter(recipe => recipe.userId === userId);
  }

  addRecipe(recipe: Recipe) {
    const recipes = this.getAllRecipes();
    recipe.id = Date.now();
    recipes.push(recipe);
    this.saveAllRecipes(recipes);
  }

  updateRecipe(updatedRecipe: Recipe) {
    const recipes = this.getAllRecipes();
    const index = recipes.findIndex(r => r.id === updatedRecipe.id);
    if (index !== -1) {
      recipes[index] = updatedRecipe;
      this.saveAllRecipes(recipes);
    }
  }

  deleteRecipe(id: number) {
    let recipes = this.getAllRecipes();
    recipes = recipes.filter(r => r.id !== id);
    this.saveAllRecipes(recipes);
  }

  getRecipeById(id: number): Recipe | undefined {
    const recipes = this.getAllRecipes();
    return recipes.find(r => r.id === id);
  }

  searchRecipes(userId: number, searchText: string = '', categoryId?: number): Recipe[] {
    return this.getRecipesByUser(userId).filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = categoryId ? r.categoryId === categoryId : true;
      return matchesSearch && matchesCategory;
    });
  }

  toggleBookmark(id: number) {
    const recipes = this.getAllRecipes();
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      recipe.bookmarked = !recipe.bookmarked;
      this.saveAllRecipes(recipes);
    }
  }

  private getAllRecipes(): Recipe[] {
    return JSON.parse(localStorage.getItem(this.recipesKey) || '[]');
  }

  private saveAllRecipes(recipes: Recipe[]) {
    localStorage.setItem(this.recipesKey, JSON.stringify(recipes));
  }
}
