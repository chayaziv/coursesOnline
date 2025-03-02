import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../services/auth.service';
import { CourseComponent } from '../course/course.component';
import { MyCoursesService } from '../../services/my-courses.service';

@Component({
  selector: 'app-my-courses',
  imports: [CourseComponent],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css',
})
export class MyCoursesComponent implements OnInit {
  myCourses: Course[] = [];
  userId: string = '';
  constructor(
    public myCoursesService: MyCoursesService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.myCoursesService.myCourses$.subscribe((courses) => {
      this.myCourses = courses;
    });
    this.authService.userId$.subscribe((userId) => {
      this.userId = userId!;
      this.myCoursesService.getMyCourses();
    });
  }
  EnrollCourse(courseId: string) {
    this.myCoursesService.EnrollCourse(courseId);
  }
  UnEnrollCourse(courseId: string) {
    this.myCoursesService.UnEnrollCourse(courseId);
  }
}
