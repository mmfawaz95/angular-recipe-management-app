import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'app_users';
  private currentUserKey = 'current_user';
  private encryptionKey = 'your-secure-key-123';
  
  private currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private router: Router) {
    this.loadCurrentUser();
  }

  register(username: string, password: string): { success: boolean, message: string } {
    const users = this.getUsers();
    
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, message: 'Username already exists' };
    }

    const newUser = {
      id: Date.now(),
      username,
      password: this.encrypt(password)
    };

    users.push(newUser);
    this.saveUsers(users);
    return { success: true, message: 'Registration successful!' };
  }


  login(username: string, password: string): { success: boolean, message: string } {
    const users = this.getUsers();
    const user = users.find(u => 
      u.username.toLowerCase() === username.toLowerCase() && 
      this.decrypt(u.password) === password
    );

    if (user) {
      this.setCurrentUser(user);
      return { success: true, message: 'Login successful!' };
    }
    return { success: false, message: 'Invalid username or password' };
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser.value;
  }

 
  getCurrentUserId(): number {
    return this.currentUser.value?.id || 0;
  }

  private loadCurrentUser() {
    const userData = localStorage.getItem(this.currentUserKey);
    if (userData) {
      try {
        this.currentUser.next(JSON.parse(this.decrypt(userData)));
      } catch (e) {
        console.error('Failed to parse user data', e);
        this.logout();
      }
    }
  }

  private setCurrentUser(user: any) {
    const encrypted = this.encrypt(JSON.stringify(user));
    localStorage.setItem(this.currentUserKey, encrypted);
    this.currentUser.next(user);
  }

  private getUsers(): any[] {
    const data = localStorage.getItem(this.usersKey);
    return data ? JSON.parse(this.decrypt(data)) : [];
  }

  private saveUsers(users: any[]) {
    const encrypted = this.encrypt(JSON.stringify(users));
    localStorage.setItem(this.usersKey, encrypted);
  }

  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  private decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}