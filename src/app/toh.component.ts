import {Component, OnInit} from '@angular/core';
import {Hero} from './shared/hero';
import {HeroService} from './shared/hero/hero.service';

@Component({
  selector: 'toh-app',
  template: `
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <toh-hero-detail [hero]="selectedHero"></toh-hero-detail>
`,
  styleUrls: ['./toh.component.scss']
})
export class TohComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes = [];
  selectedHero: Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
