import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { CourseList } from './components/course-list/course-list';
import { CourseDetails } from './components/course-details/course-details';
import { AddCourse } from './components/add-course/add-course';
import { Login } from './components/login/login';
import { RapLGenie } from './components/rapl-genie/rapl-genie';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'courses',
    component: CourseList,
    canActivate: [authGuard]
  },
  {
    path: 'courses/:id',
    component: CourseDetails,
    canActivate: [authGuard]
  },
  {
    path: 'add-course',
    component: AddCourse,
    canActivate: [adminGuard]
  },
  {
    path: 'rapl-genie',
    component: RapLGenie
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];