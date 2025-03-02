import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { Course } from '../../models/course.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lesson.model';
import { Router } from '@angular/router';
import { MyCoursesService } from '../../services/my-courses.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course',
  imports: [MatCardModule, MatButtonModule, MatIconModule,CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {
  @Input() course!: Course;
  @Input() role: string = '';
  @Output() view=new EventEmitter();
 @Output() delete=new EventEmitter();
 @Output() edit=new EventEmitter();
  constructor(
    public router: Router,
    public myCoursesService: MyCoursesService
  ) {}

  View() {
    this.view.emit(this.course.id);
  }
  Delete() {
    this.delete.emit(this.course.id);
  }
  Edit() {
    this.edit.emit(this.course);
  }

  Enroll() {
    this.myCoursesService.EnrollCourse(this.course.id!);
    console.log('enrolled');
    this.router.navigate(['/mycourses']);
  }
  isEnrolled(): Observable<boolean> {
    return this.myCoursesService.isEnrolled(this.course.id!);
  }
}
