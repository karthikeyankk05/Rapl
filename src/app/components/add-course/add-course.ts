import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css'
})
export class AddCourse {

  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);
  private router = inject(Router);

  submitted = false;

  courseForm = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10)
      ]
    ],

    duration: [
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    lessons: [
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    status: [
      'Not Started' as
        'Completed' |
        'In Progress' |
        'Not Started',
      Validators.required
    ]
  });

  get name() {
    return this.courseForm.controls.name;
  }

  get description() {
    return this.courseForm.controls.description;
  }

  get duration() {
    return this.courseForm.controls.duration;
  }

  get lessons() {
    return this.courseForm.controls.lessons;
  }

  get status() {
    return this.courseForm.controls.status;
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const formValue = this.courseForm.getRawValue();

    const newCourse = {
      id: Date.now(),
      name: formValue.name.trim(),
      description: formValue.description.trim(),
      duration: formValue.duration,
      lessons: formValue.lessons,
      status: formValue.status
    };

    this.courseService.addCourse(newCourse);

    this.router.navigate(['/courses']);
  }

  resetForm(): void {

    this.courseForm.reset({
      name: '',
      description: '',
      duration: 1,
      lessons: 1,
      status: 'Not Started'
    });

    this.submitted = false;
  }
}