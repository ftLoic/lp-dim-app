import { environment } from './../../../environments/environment';
import { Student } from './../../core/models/student';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { max, Observable } from 'rxjs';

@Injectable()
export class StudentService {
  private readonly studentPath: string = '/students';

  constructor(private _http: HttpClient) {}

  get(): Observable<Student[]> {
    return this._http.get<Student[]>(
      `${environment.apiBaseUrl}${this.studentPath}`
    );
  }

  getById(id: number): Observable<Student> {
    return this._http.get<Student>(
      `${environment.apiBaseUrl}${this.studentPath}/${id}`
    );
  }

  create(student: Student): Observable<string> {
    return this._http.post<string>(
      `${environment.apiBaseUrl}${this.studentPath}`,
      student
    );
  }

  update(student: Student): Observable<string> {
    return this._http.put<string>(
      `${environment.apiBaseUrl}${this.studentPath}/${student.id}`,
      student
    );
  }

  delete(id: number): Observable<string> {
    return this._http.delete<string>(
      `${environment.apiBaseUrl}${this.studentPath}/${id}`
    );
  }
}
