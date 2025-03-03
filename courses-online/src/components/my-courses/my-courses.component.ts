import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { AuthService } from '../../services/auth.service';
import { CourseComponent } from '../course/course.component';
import { MyCoursesService } from '../../services/my-courses.service';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-courses',
  imports: [CourseComponent, MatButtonModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css',
})
export class MyCoursesComponent implements OnInit {
  myCourses: Course[] = [];
  role: string = 'student';

  constructor(
    public myCoursesService: MyCoursesService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.myCoursesService.myCourses$.subscribe((courses) => {
      this.myCourses = courses;
      
    });
    this.myCoursesService.getMyCourses();
  }
  
}
