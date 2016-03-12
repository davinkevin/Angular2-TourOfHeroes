/**
 * Created by kevin on 05/03/2016.
 */
import {Injectable} from 'angular2/core';
import {HEROES} from './mock.heroes';
import {Hero} from "../entity/hero";

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