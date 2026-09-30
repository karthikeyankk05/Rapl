import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RapLGenie } from './rapl-genie';

describe('RapLGenie', () => {
  let component: RapLGenie;
  let fixture: ComponentFixture<RapLGenie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapLGenie],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RapLGenie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
