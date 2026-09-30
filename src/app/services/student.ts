import { Injectable } from '@angular/core';
import { StudentRecord } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: StudentRecord[] = [
    {
      id: 's1',
      name: 'Karthikeyan',
      email: 'student@rapl.demo',
      enrolledCoursesCount: 6,
      completedCoursesCount: 2,
      inProgressCoursesCount: 2,
      recentCourse: 'Angular Fundamentals',
      status: 'Active'
    },
    {
      id: 's2',
      name: 'Priya Sharma',
      email: 'priya.s@rapl.demo',
      enrolledCoursesCount: 5,
      completedCoursesCount: 3,
      inProgressCoursesCount: 1,
      recentCourse: 'TypeScript Basics',
      status: 'Active'
    },
    {
      id: 's3',
      name: 'Rahul Verma',
      email: 'rahul.v@rapl.demo',
      enrolledCoursesCount: 4,
      completedCoursesCount: 4,
      inProgressCoursesCount: 0,
      recentCourse: 'HTML & CSS',
      status: 'Completed'
    },
    {
      id: 's4',
      name: 'Ananya Patel',
      email: 'ananya.p@rapl.demo',
      enrolledCoursesCount: 5,
      completedCoursesCount: 2,
      inProgressCoursesCount: 3,
      recentCourse: 'JavaScript Essentials',
      status: 'Active'
    },
    {
      id: 's5',
      name: 'Vikram Singh',
      email: 'vikram.s@rapl.demo',
      enrolledCoursesCount: 4,
      completedCoursesCount: 1,
      inProgressCoursesCount: 2,
      recentCourse: 'Git & GitHub',
      status: 'Active'
    },
    {
      id: 's6',
      name: 'Deepa Nair',
      email: 'deepa.n@rapl.demo',
      enrolledCoursesCount: 3,
      completedCoursesCount: 2,
      inProgressCoursesCount: 1,
      recentCourse: 'Web Accessibility',
      status: 'Active'
    }
  ];

  getStudents(): StudentRecord[] {
    return this.students;
  }

  getTotalStudentsCount(): number {
    return this.students.length;
  }

  getTotalCompletionsCount(): number {
    return this.students.reduce((acc, curr) => acc + curr.completedCoursesCount, 0);
  }
}
