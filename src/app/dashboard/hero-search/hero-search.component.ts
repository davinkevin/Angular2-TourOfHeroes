import { Component, OnInit } from '@angular/core';
import {HeroService} from '../../shared/hero/hero.service';
import {Observable, Subject} from 'rxjs';
import {Hero} from '../../shared/hero';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'toh-hero-search',
  templateUrl: 'hero-search.component.html',
  styleUrls: ['hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

  heroes: Observable<Hero[]>;
  searchTerms = new Subject<string>();

  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.heroService.search(term) : Observable.of<Hero[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }

}
