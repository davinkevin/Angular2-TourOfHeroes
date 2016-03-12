/**
 * Created by kevin on 05/03/2016.
 */
import {Input, Component, OnInit} from 'angular2/core';
import {RouteParams} from "angular2/router";
import {HeroService} from "../../common/service/hero.service";
import {Hero} from "../../common/entity/hero";

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/heroes/details/hero.detail.component.html',
    styleUrls : ['app/heroes/details/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero : Hero;

    constructor(private heroService: HeroService, private routeParams: RouteParams){}

    async ngOnInit() {
        let id = +this.routeParams.get('id');
        this.hero = await this.heroService.findOne(id);
    }

    goBack() : void {
        window.history.back();
    }
}
