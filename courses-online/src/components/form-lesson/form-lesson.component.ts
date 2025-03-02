// import { Component } from '@angular/core'

// @Component({
//   selector: 'app-form-lesson',
//   imports: [],
//   templateUrl: './form-lesson.component.html',
//   styleUrl: './form-lesson.component.css'
// })
// export class FormLessonComponent {

// }

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lesson.model';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ButtonStyleDirective } from '../../directives/button-style.directive';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,ButtonStyleDirective
  ],
  templateUrl: './form-lesson.component.html',
  styleUrls: ['./form-lesson.component.css'],
})
export class LessonFormComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() courseId: string = '';
  @Input() lesson: Lesson = new Lesson('', '', '', '');

  @Output() closeForm = new EventEmitter<void>();
  lessonForm!: FormGroup;

  constructor(private fb: FormBuilder, private lessonService: LessonService) {}

  ngOnInit(): void {
    // יצירת הטופס
    this.lessonForm = this.fb.group({
      title: [this.lesson.title, Validators.required],
      content: [this.lesson.content, Validators.required],
    });

    // אם מדובר בעריכה, נטען את השיעור הקיים
    if (this.isEdit) {
      this.lessonForm.patchValue({
        title: this.lesson.title,
        content: this.lesson.content,
      });
    }
  }

  onSubmit() {
    if (this.lessonForm.valid) {
      const formValues = this.lessonForm.value as Lesson;
      if (this.isEdit) {
        this.lessonService
          .updateLesson(this.lesson.id, {
            ...formValues,
            courseId: this.courseId,
          })
          .subscribe(() => {
            console.log('Lesson updated');
            this.onCancel();
          });
      } else {
        this.lessonService
          .addLesson(this.courseId, formValues)
          .subscribe(() => {
            console.log('Lesson added');
            this.onCancel();
          });
      }
    }
  }

  onCancel() {
    // כאן נוכל להוסיף לוגיקה לסגירת הטופס

    this.closeForm.emit();
  }
}
