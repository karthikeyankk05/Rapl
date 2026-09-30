import { TestBed } from '@angular/core/testing';
import { CourseService } from './course';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve courses list', () => {
    const courses = service.getCourses();
    expect(courses.length).toBeGreaterThan(0);
  });

  it('should find course by ID', () => {
    const course = service.getCourseById(1);
    expect(course).toBeDefined();
    expect(course?.name).toBe('Angular Fundamentals');
  });

  it('should add a new course', () => {
    const initialCount = service.getCourses().length;
    service.addCourse({
      id: 999,
      name: 'Test Course',
      description: 'Testing course description',
      duration: 5,
      lessons: 10,
      status: 'Not Started'
    });
    expect(service.getCourses().length).toBe(initialCount + 1);
  });
});