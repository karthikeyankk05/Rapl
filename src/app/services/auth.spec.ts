import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    service.logout();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start logged out', () => {
    expect(service.isLoggedIn()).toBe(false);
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should login student successfully', () => {
    const success = service.login('student@rapl.demo', 'student123');
    expect(success).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
    expect(service.getCurrentUser()?.name).toBe('Karthikeyan');
    expect(service.getCurrentUser()?.role).toBe('Student');
    expect(service.isAdmin()).toBe(false);
  });

  it('should login admin successfully', () => {
    const success = service.login('admin@rapl.demo', 'admin123');
    expect(success).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
    expect(service.getCurrentUser()?.role).toBe('Admin');
    expect(service.isAdmin()).toBe(true);
  });

  it('should reject invalid credentials', () => {
    const success = service.login('student@rapl.demo', 'wrongpassword');
    expect(success).toBe(false);
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should clear session on logout', () => {
    service.login('admin@rapl.demo', 'admin123');
    expect(service.isLoggedIn()).toBe(true);
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    expect(service.getCurrentUser()).toBeNull();
  });
});
