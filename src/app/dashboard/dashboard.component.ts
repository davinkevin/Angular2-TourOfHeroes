import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from '../shared/hero';
import {HeroService} from '../shared/hero/hero.service';

@Component({
  selector : 'toh-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls : [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero): void {
    let link = [ '/detail', hero.id ];
    this.router.navigate(link);
  }
}
