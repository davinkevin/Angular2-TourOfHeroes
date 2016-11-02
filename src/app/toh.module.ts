import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroService} from './shared/hero/hero.service';
import {TohRoutingModule} from './toh-routing.module';
import {TohComponent} from './toh.component';
import {HeroSearchComponent} from './dashboard/hero-search/hero-search.component';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule, TohRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations:
      [TohComponent, HeroDetailComponent, HeroesComponent, DashboardComponent, HeroSearchComponent],
  providers: [HeroService],
  bootstrap: [TohComponent]
})
export class TohModule {
}
