export type UserRole = 'Student' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
