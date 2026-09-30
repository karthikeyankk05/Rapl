export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  enrolledCoursesCount: number;
  completedCoursesCount: number;
  inProgressCoursesCount: number;
  recentCourse: string;
  status: 'Active' | 'Completed';
}
