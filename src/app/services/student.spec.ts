import { TestBed } from '@angular/core/testing';
import { StudentService } from './student';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return students list', () => {
    const students = service.getStudents();
    expect(students.length).toBeGreaterThan(0);
  });

  it('should calculate total students count', () => {
    expect(service.getTotalStudentsCount()).toBe(6);
  });

  it('should calculate total course completions by students', () => {
    expect(service.getTotalCompletionsCount()).toBe(14);
  });
});
