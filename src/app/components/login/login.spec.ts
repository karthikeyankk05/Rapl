import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with invalid form', () => {
    expect(component.loginForm.valid).toBe(false);
  });

  it('should populate fields with fillDemo', () => {
    component.fillDemo('student');
    expect(component.loginForm.value.email).toBe('student@rapl.demo');
    expect(component.loginForm.value.password).toBe('student123');
    expect(component.loginForm.valid).toBe(true);
  });
});
