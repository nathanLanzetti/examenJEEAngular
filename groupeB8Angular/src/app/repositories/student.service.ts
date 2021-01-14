import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Student, StudentToDB } from "../models/Student";

const URL_API: string = "api/student"
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  query(): Observable<StudentToDB[]> {
    return this.http.get<StudentToDB[]>(URL_API);
  }

  getById(id: number): Observable<StudentToDB> {
    return this.http.get<StudentToDB>(`${URL_API}/${id}`);
  }
  getByMatricule(matricule: string): Observable<StudentToDB> {
    return this.http.get<StudentToDB>(`${URL_API}/${matricule}`);
  }

  post(student: StudentToDB): Observable<StudentToDB> {
    return this.http.post<StudentToDB>(URL_API, student)
  }

  postAll(students: StudentToDB[]): Observable<StudentToDB[]> {
    return this.http.post<StudentToDB[]>(`${URL_API}/all`, students)
  }

  put(student: StudentToDB): Observable<any> {
    return this.http.put(URL_API, student);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${URL_API}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${URL_API}/all`)
  }
}
