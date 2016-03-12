/**
 * Created by kevin on 05/03/2016.
 */
import {Component, OnInit, Type} from 'angular2/core';
import {Router} from "angular2/router";
import {HeroDetailComponent} from "./details/hero-detail.component";
import {Hero} from "../common/entity/hero";
import {HeroService} from "../common/service/hero.service";

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes/heroes.component.html',
    styleUrls : ['app/heroes/heroes.component.css'],
    directives : [ <Type>HeroDetailComponent ]
})
export default class HeroesComponent implements OnInit {
    public title = 'Star Wars Characters';
    public selectedHero: Hero;
    public heroes : Array<Hero>;

    constructor(private heroService: HeroService, private router : Router) {}

    async ngOnInit() {
        this.heroes = await this.heroService.getHeroesSlowly();
    }

    onSelect(hero:Hero):void {
        this.selectedHero = hero;
    }

    gotoDetail() : void {
        this.router.navigate(['HeroDetail', {id : this.selectedHero.id}]);
    }
}

