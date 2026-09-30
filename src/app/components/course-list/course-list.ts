import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { AuthService } from '../../services/auth';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  private courseService = inject(CourseService);
  private authService = inject(AuthService);

  isAdmin = computed(() => this.authService.isAdmin());

  courses: Course[] = [];
  filteredCourses: Course[] = [];

  searchTerm = '';
  selectedStatus = 'All';
  sortAscending = true;

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courses = this.courseService.getCourses();
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.courses];

    // Search by course name or description
    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase().trim();

      result = result.filter(course =>
        course.name.toLowerCase().includes(search) ||
        course.description.toLowerCase().includes(search)
      );
    }

    // Status filter
    if (this.selectedStatus !== 'All') {
      result = result.filter(
        course => course.status === this.selectedStatus
      );
    }

    // Sort by course name
    result.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);

      return this.sortAscending
        ? comparison
        : -comparison;
    });

    this.filteredCourses = result;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  toggleSort(): void {
    this.sortAscending = !this.sortAscending;
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'All';
    this.sortAscending = true;

    this.applyFilters();
  }
}