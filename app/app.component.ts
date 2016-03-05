/**
 * Created by kevin on 05/03/2016.
 */
import {Component} from 'angular2/core';
import {HeroDetailComponent} from './hero-detail.component';
import {Hero} from './hero';

var HEROES: Hero[] = [
    { "id": 11, "name": "Luke Skywalker" },
    { "id": 12, "name": "Leïa Organa" },
    { "id": 13, "name": "Obi-wan Kenobi" },
    { "id": 14, "name": "Anakin Skywalker" },
    { "id": 15, "name": "Darth Maul" },
    { "id": 16, "name": "Qui-Gon Jinn" },
    { "id": 17, "name": "Yoda" },
    { "id": 18, "name": "Mace Windu" },
    { "id": 19, "name": "Padme Amidala" },
    { "id": 20, "name": "Palpatine" }
];

@Component({
    selector: 'my-app',
    template: `
            <h2>My Star Wars Characters</h2>
            <ul class="heroes">
                <li *ngFor="#hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
                    <span class="badge">{{hero.id}}</span> {{hero.name}}
                </li>
            </ul>
            <my-hero-detail [hero]="selectedHero"></my-hero-detail>
    `,
    styles:[`
      .selected {
        background-color: #CFD8DC !important;
        color: white;
      }
      .heroes {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: 15em;
      }
      .heroes li {
        cursor: pointer;
        position: relative;
        left: 0;
        background-color: #EEE;
        margin: .5em;
        padding: .3em 0;
        height: 1.6em;
        border-radius: 4px;
      }
      .heroes li.selected:hover {
        background-color: #BBD8DC !important;
        color: white;
      }
      .heroes li:hover {
        color: #607D8B;
        background-color: #DDD;
        left: .1em;
      }
      .heroes .text {
        position: relative;
        top: -3px;
      }
      .heroes .badge {
        display: inline-block;
        font-size: small;
        color: white;
        padding: 0.8em 0.7em 0 0.7em;
        background-color: #607D8B;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        margin-right: .8em;
        border-radius: 4px 0 0 4px;
      }
    `],
    directives : [ HeroDetailComponent ]
})
export default class AppComponent {
    public title = 'Star Wars Characters';
    public selectedHero: Hero;
    public heroes : Array<Hero> = HEROES;

    onSelect(hero:Hero):void {
        this.selectedHero = hero;
    }
}

