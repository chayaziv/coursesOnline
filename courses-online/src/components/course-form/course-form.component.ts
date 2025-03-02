import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ButtonStyleDirective } from '../../directives/button-style.directive';

@Component({
  selector: 'app-course-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,ButtonStyleDirective
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent {
  @Input() isEdit: boolean = false;
  @Input() teacherId: string = '';
  @Input() course: Course = new Course(null, '', '', '');

  @Output() closeForm = new EventEmitter<void>();
  courseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    // יצירת הטופס
    this.courseForm = this.fb.group({
      title: [this.course.title, Validators.required],
      description: [this.course.description, Validators.required],
    });

    // אם מדובר בעריכה, נטען את השיעור הקיים
    if (this.isEdit) {
      this.courseForm.patchValue({
        title: this.course.title,
        description: this.course.description,
      });
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const formValues = this.courseForm.value as Course;
      if (this.isEdit) {
        this.coursesService
          .updateCourse(this.course.id!, {
            ...formValues,
            teacherId: this.teacherId,
          })
          .subscribe(() => {
            this.onCancel();
          });
      } else {
        this.coursesService
          .addCourse({
            ...formValues,
          })
          .subscribe(() => {
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
