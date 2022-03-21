import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '',
    component : StudentComponent,
    children : [
      {
        path : '',
        component : StudentListComponent
      },
      {
        path : ':id',
        component : StudentDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
