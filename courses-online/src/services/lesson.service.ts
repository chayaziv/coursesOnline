import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  baseUrl: string = 'coursesserver-p3is.onrender.com/api/courses';

  constructor(private http: HttpClient) {}

  getLessonsForCourse(id: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`https://${this.baseUrl}/${id}/lessons`);
  }

  deleteLesson(id: string, courseId: string): Observable<void> {
    return this.http.delete<void>(`https://${this.baseUrl}/${courseId}/lessons/${id}`);
  }

  addLesson(courseId: string, lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(
      `https://${this.baseUrl}/${courseId}/lessons`,
      lesson
    );
  }

  updateLesson(id: string, lesson: Lesson): Observable<Lesson> {
    return this.http.put<Lesson>(
      `https://${this.baseUrl}/${lesson.courseId}/lessons/${id}`,
      lesson
    );
  }
}
