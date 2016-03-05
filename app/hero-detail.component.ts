/**
 * Created by kevin on 05/03/2016.
 */
import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {RouteParams} from "angular2/router";
import {HeroService} from "./hero.service";

@Component({
    selector: 'my-hero-detail',
    inputs : ['hero'],
    templateUrl: 'app/hero.detail.component.html',
    styleUrls : ['./app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    public hero : Hero;

    constructor(private heroService: HeroService, private routeParams: RouteParams){}

    async ngOnInit():any {
        let id = +this.routeParams.get('id');
        this.hero = await this.heroService.findOne(id);
    }

    goBack() : void {
        window.history.back();
    }
}
