import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [ StudentService ]
})
export class StudentListComponent implements OnInit {
    students$: Observable<Student[]>;
    displayedColumns = ['id', 'firstName', 'lastName', 'class', 'dateOfBirth'];

    constructor(private _studentService: StudentService) { }

    ngOnInit(): void {
        this.students$ = this._studentService.get();
    }
}
