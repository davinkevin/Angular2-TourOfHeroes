import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from '../shared/hero';
import {HeroService} from '../shared/hero/hero.service';

@Component({
  selector : 'toh-heroes',
  templateUrl : './heroes.component.html',
  styleUrls : [ './heroes.component.scss' ]
})
export class HeroesComponent implements OnInit {
  heroes = [];
  selectedHero: Hero;

  constructor(private router: Router, private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void { this.selectedHero = hero; }

  gotoDetail(): void {
    this.router.navigate([ '/detail', this.selectedHero.id ]);
  }
}
