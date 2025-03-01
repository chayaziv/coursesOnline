import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../services/auth.service';
import { CourseComponent } from "../course/course.component";

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
    public coursesService: CoursesService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.userId$.subscribe((userId) => {
      this.userId = userId!;
      this.coursesService
        .getCoursesByStudentId(this.userId)
        .subscribe((courses) => {
          this.myCourses = courses;
          console.log('My courses:', this.myCourses);
        });
    });
  }

  UnEnroll(courseId: string) {
    console.log(courseId, 'unEnroll');
  }
}
