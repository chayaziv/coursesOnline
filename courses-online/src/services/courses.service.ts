import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';

  private coursesBehaviorSubject = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]> =
    this.coursesBehaviorSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllCourses() {

    const response = this.http.get<Course[]>(this.apiUrl);
    response.subscribe(
      (courses) => {
        this.coursesBehaviorSubject.next(courses);
      },
      (error) => alert('Error:' + error.message)
    );
  }

  deleteCourse(id: string): Observable<void> {
    const response = this.http.delete<void>(`${this.apiUrl}/${id}`);
    response.subscribe(() => {
      this.getAllCourses();
    },(error) => alert('Error:' + error.message));
    return response;
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }
  addCourse(course: Course) {
    return this.http.post<{ courseId: string }>(this.apiUrl, course).pipe(
      tap((response) => {
        const newCourse = { ...course, id: response.courseId }; 
        const currentCourses = this.coursesBehaviorSubject.getValue();
        this.coursesBehaviorSubject.next([...currentCourses, newCourse]); 
      },
      (error) => alert('Error:' + error.message))
    );
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    const response = this.http.put<Course>(`${this.apiUrl}/${id}`, course);
    response.subscribe(() => {
      this.getAllCourses();
    },(error) => alert('Error:' + error.message));
    return response;
  }
}
