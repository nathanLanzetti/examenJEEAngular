import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Unit, UnitToDB } from "../models/Unit";

const URL_API: string = "api/unit"
@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  query(): Observable<UnitToDB[]> {
    return this.http.get<UnitToDB[]>(URL_API);
  }

  queryWithoutDuplicates(): Observable<UnitToDB[]> {
    return this.http.get<UnitToDB[]>(`${URL_API}/unique`);
  }

  getById(id: number): Observable<UnitToDB> {
    return this.http.get<UnitToDB>(`${URL_API}/${id}`);
  }
  getByCode(code: string): Observable<UnitToDB> {
    return this.http.get<UnitToDB>(`${URL_API}/${code}`);
  }

  post(unit: UnitToDB): Observable<UnitToDB> {
    return this.http.post<UnitToDB>(URL_API, unit)
  }

  postAll(units: UnitToDB[]): Observable<UnitToDB[]> {
    return this.http.post<UnitToDB[]>(`${URL_API}/all`, units)
  }

  put(unit: UnitToDB): Observable<any> {
    return this.http.put(URL_API, unit);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${URL_API}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${URL_API}/all`);
  }
}
