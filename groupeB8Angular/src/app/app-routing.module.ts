import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragZoneExcelComponent } from './excel/drag-zone-excel/drag-zone-excel.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ManagerStudentComponent } from './student-card/manager-student/manager-student.component';
import { ContainerStudentsComponent } from './students/container-students/container-students.component';


const routes: Routes = [
  { path: 'auth/signin', component: SignInComponent },
  { path: 'etudiants', component: ContainerStudentsComponent },
  { path: 'excel', component: DragZoneExcelComponent },
  { path: 'etudiants/:matricule', component: ManagerStudentComponent },
  /*
  { path: 'correctifs/:id', canActivate: [AuthGuard], component: CorrectifsComponent },
  */
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' /*prevent bugs on empty paths*/ },
  { path: '**', redirectTo: 'auth/signin' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
