import { StudentFormData } from './../../../core/models/studentFormData';
import { StudentFormComponent } from './../../components/student-form/student-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/models/student';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  student$: Observable<Student>;
  constructor(
    private _studentService: StudentService,
    private _activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.fetchData(params['id']);
    });
  }

  fetchData(id: number) {
    this.student$ = this._studentService.getById(id);
  }

  updateStudent(student: Student) {
    const studentFormData: StudentFormData = {
      isUpdateMode: true,
      studentToUpdate: student,
    };

    const dialogRef = this._dialog.open(StudentFormComponent, {
      data: studentFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchData(result);
      }
    });
  }

  deleteStudent(id: number) {
    this._studentService.delete(id).subscribe((response) => {
      this._snackBar.open(response, '', {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-accent'],
      });

      this._router.navigateByUrl('/students');
    });
  }

  goBack() {
    this._location.back();
  }
}
