export interface Course {
  id: number;
  name: string;
  description: string;
  duration: number;
  lessons: number;
  status: 'Completed' | 'In Progress' | 'Not Started';
}