/**
 * Created by kevin on 05/03/2016.
 */
import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {HeroDetailComponent} from './hero-detail.component';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Type} from "angular2/core";
import {Router} from "angular2/router";

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls : ['app/heroes.component.css'],
    directives : [ <Type>HeroDetailComponent ]
})
export default class HeroesComponent implements OnInit {
    public title = 'Star Wars Characters';
    public selectedHero: Hero;
    public heroes : Array<Hero>;

    constructor(private heroService: HeroService, private router : Router) {}

    async ngOnInit():any {
        this.heroes = await this.heroService.getHeroesSlowly();
    }

    onSelect(hero:Hero):void {
        this.selectedHero = hero;
    }

    gotoDetail() : void {
        this.router.navigate(['HeroDetail', {id : this.selectedHero.id}]);
    }
}

