/**
 * Created by kevin on 05/03/2016.
 */

import { Component, OnInit } from 'angular2/core';
import {Router} from "angular2/router";
import {Hero} from "../common/entity/hero";
import {HeroService} from "../common/service/hero.service";

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls : ['app/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    private heroes : Hero[];

    constructor(private heroService : HeroService, private router : Router){}

    async ngOnInit() {
        this.heroes = await this.heroService.getHeroesSlowly().then(h => h.slice(1, 5));
    }

    gotoDetail(hero : Hero) : void {
        this.router.navigate(['HeroDetail', { id : hero.id }]);
    }
}
