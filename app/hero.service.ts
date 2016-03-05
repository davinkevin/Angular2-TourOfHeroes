/**
 * Created by kevin on 05/03/2016.
 */
import {Injectable} from 'angular2/core';
import {Hero} from './hero';
import {HEROES} from './mock.heroes';

@Injectable()
export class HeroService {

    getHeroes() : Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }

    getHeroesSlowly() : Promise<Hero[]>{
        return new Promise<Hero[]>(
            resolve => setTimeout(()=>resolve(HEROES), 2000)
        );
    }

    findOne(id:Number) : Promise<Hero> {
        return Promise.resolve(HEROES.filter(h => h.id === id)[0]);
    }
}