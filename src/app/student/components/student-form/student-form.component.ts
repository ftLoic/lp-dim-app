import { StudentService } from './../../services/student.service';
import { Student } from './../../../core/models/student';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentFormData } from 'src/app/core/models/studentFormData';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  isUpdateMode: boolean;
  studentForm: FormGroup;

  classes: string[] = ['LP-DIM-APP', 'LP-DIM-FI'];
  constructor(
    private _formBuilder: FormBuilder,
    private _studentService: StudentService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentFormData
  ) {
    this.isUpdateMode = this.data.isUpdateMode;
  }

  ngOnInit(): void {
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.studentForm = this._formBuilder.group({
      id: [
        this.data.isUpdateMode
          ? this.data.studentToUpdate.id
          : this.data.idToCreate,
        Validators.required,
      ],
      firstName: [
        this.data.isUpdateMode ? this.data.studentToUpdate.firstName : '',
        Validators.required,
      ],
      lastName: [
        this.data.isUpdateMode ? this.data.studentToUpdate.lastName : '',
        Validators.required,
      ],
      class: [
        this.data.isUpdateMode ? this.data.studentToUpdate.class : '',
        Validators.required,
      ],
      dateOfBirth: [
        this.data.isUpdateMode ? this.data.studentToUpdate.dateOfBirth : '',
        Validators.required,
      ],
      email: [
        this.data.isUpdateMode ? this.data.studentToUpdate.email : '',
        [Validators.required, Validators.email],
      ],
    });
  }

  closeForm(id?: number) {
    this.studentForm.reset();
    this.dialogRef.close(id);
  }

  onSubmit(student: Student) {
    if (this.studentForm.valid) {
      if (this.data.isUpdateMode) {
        // update
        this._studentService.update(student).subscribe((response) => {
          this.closeForm(student.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      } else {
        // create
        this._studentService.create(student).subscribe((response) => {
          this.closeForm(student.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      }
    }
  }
}
