import { Component } from '@angular/core';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { CourseComponent } from '../course/course.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { CourseFormComponent } from '../course-form/course-form.component';
import { MyCoursesService } from '../../services/my-courses.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-all-courses',
  imports: [CourseComponent, RouterOutlet, MatIcon, CourseFormComponent,CommonModule,MatButtonModule],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css',
})
export class AllCoursesComponent {
  courses: Course[] = [];
  role: string = '';

  isAddCourse: boolean = false;
  isEditCourse: boolean = false;
  selectedCourse: Course = new Course(null, '', '', '');

  userId: string = '';

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private authService: AuthService,
    private myCoursesService: MyCoursesService
  ) {}
  ngOnInit() {
    this.coursesService.courses$.subscribe((response) => {
      this.courses = response;
    });
    this.authService.role$.subscribe((role) => {
      this.role = role;
    });
    this.authService.userId$.subscribe((userId) => {
      this.userId = userId!; // קבלת המזהה של המורה
    });

    this.coursesService.getAllCourses();
  }
  viewLessons(courseId: string) {
    this.router.navigate([`/courses/${courseId}`]);
  }
  DeleteCourse(id: string) {
    this.coursesService.deleteCourse(id).subscribe(() => {
      console.log('Course deleted, fetching updated list...');
    });
  }
  EditCourse(c: Course) {
    this.isEditCourse = true;
    this.isAddCourse = false;
    this.selectedCourse = { ...c };
  }

  AddCourse() {
    this.isAddCourse = true;
    this.isEditCourse = false;
    this.selectedCourse = new Course(null, '', '', '');
  }
  closeForm() {
    this.isAddCourse = this.isEditCourse = false;
  }
  Enroll(courseId: string) {
    this.myCoursesService.EnrollCourse(courseId);
   
    this.router.navigate(['/mycourses']);
  }
  isEnrolled(courseId: string): Observable<boolean> {
    return this.myCoursesService.isEnrolled(courseId);
  }
  
  
}
