import { Student } from './../../../core/models/student';
import { max, Observable, of } from 'rxjs';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../../components/student-form/student-form.component';
import { StudentFormData } from 'src/app/core/models/studentFormData';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  students$: Observable<Student[]>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName'];

  //Bidouille
  ids: number[] = [];

  constructor(
    private _studentService: StudentService,
    private _router: Router,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.students$ = this._studentService.get();
  }

  showStudentDetails(student: Student) {
    this._router.navigateByUrl('/students/' + student.id);
  }

  createStudent() {
    const studentFormData: StudentFormData = {
      isUpdateMode: false,
      idToCreate: Math.max(...this.ids) + 1,
    };

    const dialogRef = this._dialog.open(StudentFormComponent, {
      data: studentFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchData();
    });
  }

  setId(id: number) {
    //Bidouille
    this.ids.push(id);
  }
}
