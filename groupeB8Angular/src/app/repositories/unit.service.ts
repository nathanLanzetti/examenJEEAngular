import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Unit} from "../models/Unit";

const URL_API: string = "api/unit"
@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  query(): Observable<Unit[]> {
    return this.http.get<Unit[]>(URL_API);
  }

  getById(id: number): Observable<Unit> {
    return this.http.get<Unit>(`${URL_API}/${id}`);
  }
  getByCode(code: string): Observable<Unit> {
    return this.http.get<Unit>(`${URL_API}/${code}`);
  }

  post(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(URL_API, unit)
  }

  put(unit: Unit): Observable<any> {
    return this.http.put(URL_API, unit);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${URL_API}/${id}`);
  }
}
