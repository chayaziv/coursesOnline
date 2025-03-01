import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { AllCoursesComponent } from '../components/all-courses/all-courses.component';
import { coursesGuard } from '../guards/courses.guard';
import { adminGuard } from '../guards/admin.guard';
import { manageCoursesGuard } from '../guards/manage-courses.guard';

import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { MyCoursesComponent } from '../components/my-courses/my-courses.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  {
    path: 'courses',
    component: AllCoursesComponent,
    canActivate: [coursesGuard],
    children: [{ path: ':id', component: CourseDetailsComponent }],
  },
  { path: 'mycourses', component: MyCoursesComponent },
];
