import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private http: HttpClient) {}

  getLessonsForCourse(id: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(
      `http://localhost:3000/api/courses/${id}/lessons`
    ); // מבצע קריאה לשרת כדי לקבל את פרטי המשתמש
  }

  deleteLesson(id: string, courseId: string): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:3000/api/courses/${courseId}/lessons/${id}`
    ); // מבצע קריאה לשרת כדי למחוק את המשתמש
  }

  addLesson(courseId: string, lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(
      `http://localhost:3000/api/courses/${courseId}/lessons`,
      lesson
    ); // מבצע קריאה לשרת כדי להוסיף משתמש חדש
  }

  updateLesson(id: string, lesson: Lesson): Observable<Lesson> {
    console.log(lesson);
    return this.http.put<Lesson>(
      `http://localhost:3000/api/courses/${lesson.courseId}/lessons/${id}`,
      lesson
    ); // מבצע קריאה לשרת כדי לעדכן משתמש
  }
}
