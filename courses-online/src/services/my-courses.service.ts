import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from './courses.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MyCoursesService implements OnInit {
  private apiUrl = 'http://localhost:3000/api/courses';

  private myCoursesBehaviorSubject = new BehaviorSubject<Course[]>([]);
  public myCourses$: Observable<Course[]> =
    this.myCoursesBehaviorSubject.asObservable();

  private studentId: string = '';

  constructor(private http: HttpClient, public authService: AuthService) {}
  ngOnInit(): void {
    this.authService.userId$.subscribe((id) => {
      this.studentId = id!;
      this.getMyCourses();
    });
  }

  getMyCourses() {
    console.log('in getMyCourses');
    const response = this.http.get<Course[]>(
      `${this.apiUrl}/student/${this.studentId}`
    );
    response.subscribe(
      (courses) => {
        this.myCoursesBehaviorSubject.next(courses);
      },
      (error) => alert('Error:' + error.message)
    );
  }
  EnrollCourse(courseId: string) {
    // console.log('in EnrollCourse')
    const response = this.http.post<void>(`${this.apiUrl}/${courseId}/enroll`, {
      userId: this.studentId,
    });
    response.subscribe(() => {
      this.getMyCourses();
    });
  }
  UnEnrollCourse(courseId: string) {
    // console.log('in UnEnrollCourse')
    const response = this.http.delete<void>(
      `${this.apiUrl}/${courseId}/unenroll`,
      { body: { userId: this.studentId } }
    );
    response.subscribe(() => {
      this.getMyCourses();
    });
  }
}
