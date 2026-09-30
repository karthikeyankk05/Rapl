import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly storageKey = 'rapl-courses';

  private courses: Course[] = [
    {
      id: 1,
      name: 'Angular Fundamentals',
      description:
        'Learn the fundamentals of Angular and build modern web applications.',
      duration: 8,
      lessons: 12,
      status: 'In Progress'
    },
    {
      id: 2,
      name: 'TypeScript Basics',
      description:
        'Learn TypeScript fundamentals including types, interfaces and classes.',
      duration: 6,
      lessons: 10,
      status: 'Completed'
    },
    {
      id: 3,
      name: 'JavaScript Essentials',
      description:
        'Master modern JavaScript concepts and programming techniques.',
      duration: 10,
      lessons: 15,
      status: 'Not Started'
    },
    {
      id: 4,
      name: 'HTML & CSS',
      description:
        'Learn how to build responsive websites using HTML and CSS.',
      duration: 5,
      lessons: 8,
      status: 'Completed'
    },
    {
      id: 5,
      name: 'Git & GitHub',
      description:
        'Learn version control and collaborate using Git and GitHub.',
      duration: 4,
      lessons: 7,
      status: 'In Progress'
    },
    {
      id: 6,
      name: 'Web Accessibility',
      description:
        'Learn how to build accessible and inclusive web applications.',
      duration: 3,
      lessons: 6,
      status: 'Not Started'
    }
  ];

  constructor() {
    this.loadCourses();
  }

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
    this.saveCourses();
  }

  updateCourse(course: Course): void {
  const index = this.courses.findIndex(
    item => item.id === course.id
  );

  if (index !== -1) {
    this.courses[index] = course;
    this.saveCourses();
  }
}
  private loadCourses(): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    const savedCourses = localStorage.getItem(this.storageKey);

    if (savedCourses) {
      try {
        this.courses = JSON.parse(savedCourses);
      } catch {
        this.saveCourses();
      }
    } else {
      this.saveCourses();
    }
  }

  private saveCourses(): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.courses)
    );
  }
}