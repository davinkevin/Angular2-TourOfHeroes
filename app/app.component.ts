/**
 * Created by kevin on 05/03/2016.
 */
import { Component, Type}       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import { HeroDetailComponent } from "./heroes/details/hero-detail.component";
import HeroesComponent from "./heroes/heroes.component";
import {HeroService} from "./common/service/hero.service";


@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['Heroes']">Heroes</a>
            <a [routerLink]="['Dashboard']">Dashboard</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls : ['app/app.component.css'],
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

