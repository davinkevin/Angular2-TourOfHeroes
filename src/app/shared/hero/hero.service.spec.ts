/* tslint:disable:no-unused-variable */

import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';
import { HeroService } from './hero.service';
import {HEROES} from './mock-heroes';

describe('Service: Hero', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService]
    });
  });

  it('should provide HeroService by DI', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  it('should provide a list of Heroes after a 2 seconds delay', fakeAsync(inject([HeroService], (heroService: HeroService) => {
    /* Given */
    let heroesPromise = heroService.getHeroesSlowly();

    /* When */
    tick(2000);

    /* Then */
    heroesPromise.then((heroes) => { expect(heroes).toEqual(HEROES); });
  })));
});
