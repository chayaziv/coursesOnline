import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  baseUrl: string = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  getLessonsForCourse(id: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.baseUrl}/${id}/lessons`); 
  }

  deleteLesson(id: string, courseId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${courseId}/lessons/${id}`); 
  }

  addLesson(courseId: string, lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(
      `${this.baseUrl}/${courseId}/lessons`,
      lesson
    ); 
  }

  updateLesson(id: string, lesson: Lesson): Observable<Lesson> {
    
    return this.http.put<Lesson>(
      `${this.baseUrl}/${lesson.courseId}/lessons/${id}`,
      lesson
    ); 
  }
}
