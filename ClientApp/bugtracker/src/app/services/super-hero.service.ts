import {Injectable} from '@angular/core';
import {SuperHero} from "../models/super-hero";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuperHeroService {
  private controllerApi = "super-hero";

  constructor(private httpService: HttpClient) {
  }

  public getSuperHeroes(): Observable<SuperHero[]> {
    var url = this.controllerApi + '/heroes';
    return this.httpService.get<SuperHero[]>(url);
  }

}
