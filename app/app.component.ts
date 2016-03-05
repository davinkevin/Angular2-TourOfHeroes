/**
 * Created by kevin on 05/03/2016.
 */
import {Component} from 'angular2/core';

interface Hero {
    id: number;
    name: string;
}

@Component({
    selector: 'my-app',
    template: `
          <h1>{{title}}</h1>
          <h2>{{hero.name}} details!</h2>
          <div><label>id: </label>{{hero.id}}</div>
          <div>
            <label>name: </label>
            <div><input [(ngModel)]="hero.name" placeholder="name"></div>
          </div>
  `
})
export default class AppComponent {
    public title = 'Star Wars Characters';
    public hero : Hero = {
        id : 1,
        name : 'Luke Skywalker'
    };
}

