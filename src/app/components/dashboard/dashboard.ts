import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { AuthService } from '../../services/auth';
import { StudentService } from '../../services/student';
import { Course } from '../../models/course.model';
import { StudentRecord } from '../../models/student.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private courseService = inject(CourseService);
  private authService = inject(AuthService);
  private studentService = inject(StudentService);

  currentUser = this.authService.currentUser;
  isAdmin = computed(() => this.authService.isAdmin());

  courses: Course[] = [];

  totalCourses = 0;
  completedCourses = 0;
  inProgressCourses = 0;
  notStartedCourses = 0;

  totalStudents = computed(() => this.studentService.getTotalStudentsCount());
  totalStudentCompletions = computed(() => this.studentService.getTotalCompletionsCount());
  students = computed(() => this.studentService.getStudents());

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.courses = this.courseService.getCourses();

    this.totalCourses = this.courses.length;

    this.completedCourses =
      this.courses.filter(course => course.status === 'Completed').length;

    this.inProgressCourses =
      this.courses.filter(course => course.status === 'In Progress').length;

    this.notStartedCourses =
      this.courses.filter(course => course.status === 'Not Started').length;
  }
}