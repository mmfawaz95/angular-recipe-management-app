import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import{ReactiveFormsModule} from '@angular/forms'
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatListModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,  
    RecipesModule, 
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
  ],
   providers: [
    provideHttpClient(),  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
