import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private userAPI = "projects";
  constructor(private httpService: HttpClient) {
  }

  getProjects() : Observable<Project[]>{
    var url = this.userAPI + '/';
    return this.httpService.get<Project[]>(url);
  }

}
