/**
 * Created by kevin on 05/03/2016.
 */
import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HeroService }     from './hero.service';
import HeroesComponent from './heroes.component';
import {DashboardComponent} from './dashboard.component';
import {Type} from "angular2/core";
import {HeroDetailComponent} from "./hero-detail.component";


@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['Heroes']">Heroes</a>
            <a [routerLink]="['Dashboard']">Dashboard</a>
        </nav>
        <!--<my-heroes></my-heroes>-->
        <router-outlet></router-outlet>
    `,
    styleUrls : ['./app/app.component.css'],
    directives: [ ROUTER_DIRECTIVES ],
    providers: [ ROUTER_PROVIDERS, HeroService ]
})
@RouteConfig([
    { path: '/heroes', name: 'Heroes', component: <Type>HeroesComponent },
    { path: '/dashboard', name: 'Dashboard', component: <Type>DashboardComponent, useAsDefault: true},
    { path: '/detail/:id', name: 'HeroDetail', component: <Type>HeroDetailComponent },
])
export class AppComponent {
    title = 'Star Wars Characters';
}

