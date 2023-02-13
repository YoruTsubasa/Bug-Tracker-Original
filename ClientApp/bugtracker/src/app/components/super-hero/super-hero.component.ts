import { Component, OnInit } from '@angular/core';
import {SuperHero} from "../../models/super-hero";
import {SuperHeroService} from "../../services/super-hero.service";


@Component({
  selector: 'app-super-hero',
  templateUrl: './super-hero.component.html',
  styleUrls: ['./super-hero.component.css']
})
export class SuperHeroComponent implements OnInit {

  public heroes: SuperHero[] = [];

  constructor(private superHeroService: SuperHeroService)
  {

  }

  ngOnInit() : void
  {
    this.superHeroService.getSuperHeroes().subscribe((result)=> {
      this.heroes = result;
    });

  }
}
