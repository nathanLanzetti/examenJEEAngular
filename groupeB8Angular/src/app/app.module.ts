import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commons/header/header.component';
import { FooterComponent } from './commons/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignInComponent } from './sign-in/sign-in.component';
import { FilterMenuStudentComponent } from './students/filter-menu-student/filter-menu-student.component';
import { ContainerStudentsComponent } from './students/container-students/container-students.component';
import { TableStudentsComponent } from './students/table-students/table-students.component';
import { SearchTermPipe } from './filters/search-term.pipe';
import { SelectBlocPipe } from './filters/select-bloc.pipe';
import { SelectSectionPipe } from './filters/select-section.pipe';
import { DragZoneExcelComponent } from './excel/drag-zone-excel/drag-zone-excel.component';
import { ManagerStudentComponent } from './student-card/manager-student/manager-student.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignInComponent,
    FilterMenuStudentComponent,
    ContainerStudentsComponent,
    TableStudentsComponent,
    SearchTermPipe,
    SelectBlocPipe,
    SelectSectionPipe,
    DragZoneExcelComponent,
    ManagerStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
