/**
 * Created by kevin on 05/03/2016.
 */

import { Component, OnInit } from 'angular2/core';
import { HeroService } from './hero.service';
import {Hero} from "./hero";
import {Router} from "angular2/router";

@Component({
    selector: 'my-dashboard',
    templateUrl: './app/dashboard.component.html',
    styleUrls : ['./app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    private heroes : Hero[];

    constructor(private heroService : HeroService, private router : Router){}

    async ngOnInit():any {
        this.heroes = await this.heroService.getHeroesSlowly().then(h => h.slice(1, 5));
    }

    gotoDetail(hero : Hero) : void {
        this.router.navigate(['HeroDetail', { id : hero.id }]);
    }
}
