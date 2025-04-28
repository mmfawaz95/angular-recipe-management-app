import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'recipes', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'recipes/add', component: RecipeFormComponent, canActivate: [AuthGuard] },
  { path: 'recipes/edit/:id', component: RecipeFormComponent, canActivate: [AuthGuard] },
  { path: 'recipes/detail/:id', component: RecipeDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
