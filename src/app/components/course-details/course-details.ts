import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  course: Course | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.course = this.courseService.getCourseById(id);
  }

  get actionText(): string {
    return this.course?.status === 'Not Started'
      ? 'Start Course'
      : 'Continue Course';
  }

  startCourse(): void {
    if (!this.course) {
      return;
    }

    if (this.course.status === 'Not Started') {
  this.course.status = 'In Progress';
  this.courseService.updateCourse(this.course);
}
  }
}