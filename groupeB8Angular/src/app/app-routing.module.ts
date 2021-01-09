import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ContainerStudentsComponent } from './students/container-students/container-students.component';


const routes: Routes = [
  { path: 'auth/signin', component: SignInComponent },
  { path: 'etudiants', component: ContainerStudentsComponent },
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
