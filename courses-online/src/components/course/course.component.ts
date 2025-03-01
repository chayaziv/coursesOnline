import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lesson.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent  {
  @Input() course!: Course;



  constructor( public router: Router) {}
  
  // ViewLesson() {
  //   console.log(this.course.id,"view lesson");
  //   this.router.navigate([`/lessons/${this.course.id}`]);
  // }
}
