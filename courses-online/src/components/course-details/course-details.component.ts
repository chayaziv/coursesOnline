import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from '../../models/lesson.model';
import { forkJoin, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../services/auth.service';
import { LessonFormComponent } from '../form-lesson/form-lesson.component';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    LessonFormComponent,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  lessons: Lesson[] = [];
  courseId: string = '';
  course: Course = new Course(null, '', '', '');
  role: string = '';
  isEditLesson: boolean = false;
  isAddLesson: boolean = false;
  selectedLesson: Lesson = new Lesson('', '', '', '');

  constructor(
    public lessonService: LessonService,
    public router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.courseId = params.get('id') as string;

          return forkJoin({
            course: this.coursesService.getCourseById(this.courseId), // קריאה לפרטי הקורס
            lessons: this.lessonService.getLessonsForCourse(this.courseId), // קריאה לשיעורים
          });
        })
      )
      .subscribe(({ course, lessons }) => {
        this.course = course;
        this.lessons = lessons;
      });
    this.authService.role$.subscribe((role) => {
      this.role = role;
    });
  }

  AddLesson() {
    this.isAddLesson = true;
    this.isEditLesson = false;
    this.selectedLesson = new Lesson('', '', '', '');
  }
  DeleteLesson(id: string) {
    this.lessonService.deleteLesson(id, this.courseId).subscribe(() => {
      console.log('Lesson deleted, fetching updated list...');
      this.lessonService
        .getLessonsForCourse(this.courseId)
        .subscribe((lessons) => {
          this.lessons = lessons;
        });
    });
  }

  EditLesson(l: Lesson) {
    const { id, title, content } = l;
    this.isEditLesson = true;
    this.isAddLesson = false;
    this.selectedLesson = new Lesson(id, title, content, this.courseId);
    this.coursesService.getCourseById(this.courseId).subscribe((course) => {
      this.course = course;
    });
  }
  closeForm() {
    this.isEditLesson = false;
    this.isAddLesson = false;
    this.lessonService
      .getLessonsForCourse(this.courseId)
      .subscribe((lessons) => {
        this.lessons = lessons;
      });
  }
}
