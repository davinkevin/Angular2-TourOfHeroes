import {Injectable} from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from './mock-heroes';

@Injectable()
export class HeroService {

  constructor() {}

  getHeroes(): Promise<Hero[]> { return Promise.resolve(HEROES); }

  getHero(heroId: number): Promise<Hero> {
    return this
      .getHeroes()
      .then(heroes => heroes.find(h => h.id === heroId));
  }
}
