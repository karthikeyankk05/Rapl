import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'rapl-current-user';

  private readonly mockAccounts = [
    {
      id: '1',
      name: 'Karthikeyan',
      email: 'student@rapl.demo',
      password: 'student123',
      role: 'Student' as const
    },
    {
      id: '2',
      name: 'Admin User',
      email: 'admin@rapl.demo',
      password: 'admin123',
      role: 'Admin' as const
    }
  ];

  currentUser = signal<User | null>(this.getStoredUser());

  login(email: string, password: string): boolean {
    const trimmedEmail = email.trim().toLowerCase();
    const account = this.mockAccounts.find(
      acc => acc.email.toLowerCase() === trimmedEmail && acc.password === password
    );

    if (account) {
      const user: User = {
        id: account.id,
        name: account.name,
        email: account.email,
        role: account.role
      };
      this.saveUser(user);
      this.currentUser.set(user);
      return true;
    }

    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'Admin';
  }

  private getStoredUser(): User | null {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return null;
    }

    const saved = localStorage.getItem(this.storageKey);
    if (!saved) {
      return null;
    }

    try {
      return JSON.parse(saved) as User;
    } catch {
      return null;
    }
  }

  private saveUser(user: User): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }
}
