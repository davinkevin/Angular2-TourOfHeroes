import {Component, OnInit} from '@angular/core';
import {Hero} from '../shared/hero';
import {HeroService} from '../shared/hero/hero.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector : 'toh-hero-detail',
  templateUrl : './hero-detail.component.html',
  styleUrls : [ './hero-detail.component.scss' ]
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService
        .getHero(id)
        .then(hero => this.hero = hero);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
