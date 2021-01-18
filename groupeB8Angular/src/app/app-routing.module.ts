import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragZoneExcelComponent } from './excel/drag-zone-excel/drag-zone-excel.component';
import { AuthGuard } from './helpers/auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { ManagerStudentComponent } from './student-card/manager-student/manager-student.component';
import { ContainerStudentsComponent } from './students/container-students/container-students.component';

// Contient la liste de toutes les routes ( => pages )
const routes: Routes = [
  { path: 'auth/signin', component: SignInComponent },
  /* toutes les routes avec canActivate ne sont accessible qu'après connexion */
  { path: 'etudiants', canActivate: [AuthGuard], component: ContainerStudentsComponent },
  { path: 'excel', canActivate: [AuthGuard], component: DragZoneExcelComponent },
  { path: 'etudiants/:matricule', canActivate: [AuthGuard], component: ManagerStudentComponent },
  { path: '', redirectTo: 'etudiants', pathMatch: 'full' /* empeche les bugs quand le chemin est vide*/ },
  { path: '**', redirectTo: 'etudiants' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
