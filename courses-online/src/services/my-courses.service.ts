import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from './courses.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MyCoursesService {
  private apiUrl = ' https://coursesserver-p3is.onrender.com/api/courses';

  private myCoursesBehaviorSubject = new BehaviorSubject<Course[]>([]);
  public myCourses$: Observable<Course[]> =
    this.myCoursesBehaviorSubject.asObservable();

  private studentId: string = '';

  constructor(private http: HttpClient, public authService: AuthService) {
    this.authService.userId$.subscribe((id) => {
      this.studentId = id!;
      console.log('studentId in MyCoursesService', this.studentId);
      this.getMyCourses();
    });
  }

  getMyCourses() {
    console.log('in getMyCourses');
    if (!this.studentId) return;
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
  isEnrolled(courseId: string) {
    const res = this.myCourses$.pipe(
      map((courses) => courses.some((course) => course.id === courseId))
    );
    console.log('isEnrolled', res);
    return res;
  }
}
