/* tslint:disable:no-unused-variable */

import {TestBed, inject, async} from '@angular/core/testing';
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

  it('should provide a list of Heroes', async(inject([HeroService], (heroService: HeroService) => {
    /* When */
    let heroesPromise = heroService.getHeroes();
    /* Then */
    heroesPromise.then((heroes) => { expect(heroes).toEqual(HEROES); });
  })));

  it('should get hero', async(inject([HeroService], (heroService: HeroService) => {
    heroService
      .getHero(12)
      .then(hero => {
        expect(hero.id).toEqual(12);
        expect(hero.name).toEqual('Narco');
      });
  })));
});
