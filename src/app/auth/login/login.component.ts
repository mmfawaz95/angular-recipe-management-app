import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  standalone:false
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const result = this.authService.login(this.username, this.password);
    
    if (result.success) {
      this.router.navigate(['/recipes']);
    } else {
      this.errorMessage = result.message;
    }
    
    this.isLoading = false;
  }
}