import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../models/Student";

const URL_API: string = "api/student"
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  query(): Observable<Student[]> {
    return this.http.get<Student[]>(URL_API);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${URL_API}/${id}`);
  }
  getByMatricule(matricule: string): Observable<Student> {
    return this.http.get<Student>(`${URL_API}/${matricule}`);
  }

  post(student: Student): Observable<Student> {
    return this.http.post<Student>(URL_API, student)
  }

  put(student: Student): Observable<any> {
    return this.http.put(URL_API, student);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${URL_API}/${id}`);
  }
}
