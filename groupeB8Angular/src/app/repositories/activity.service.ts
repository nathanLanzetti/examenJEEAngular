import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../models/Activity";

const URL_API: string = "api/activity"
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  query(): Observable<Activity[]> {
    return this.http.get<Activity[]>(URL_API);
  }

  getById(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${URL_API}/${id}`);
  }
  getByTitle(title: string): Observable<Activity> {
    return this.http.get<Activity>(`${URL_API}/${title}`);
  }

  post(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(URL_API, activity)
  }

  put(activity: Activity): Observable<any> {
    return this.http.put(URL_API, activity);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${URL_API}/${id}`);
  }
}
