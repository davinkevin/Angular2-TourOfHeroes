import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroService} from './shared/hero/hero.service';
import {TohRoutingModule} from './toh-routing.module';
import {TohComponent} from './toh.component';

@NgModule({
  imports : [ BrowserModule, FormsModule, TohRoutingModule ],
  declarations : [
    TohComponent, HeroDetailComponent, HeroesComponent, DashboardComponent
  ],
  providers : [ HeroService ],
  bootstrap : [ TohComponent ]
})
export class TohModule {}
