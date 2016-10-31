/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {Router} from '@angular/router';

import {HeroService} from '../shared/hero/hero.service';

import {HeroSearchComponent} from './hero-search.component';

import Spy = jasmine.Spy;
import {HEROES} from '../shared/hero/mock-heroes';
import {Observable} from 'rxjs';
import {DebugElement} from '@angular/core';
import {Hero} from '../shared/hero';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let el: DebugElement;
  let mockRouter: Router, mockHeroService: HeroService;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockHeroService = jasmine.createSpyObj<HeroService>('HeroService', ['search']);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search with an item', fakeAsync(() => {
    /* Given */
    (mockHeroService.search as Spy).and.returnValue(Observable.of(HEROES));
    /* When  */
    component.search('Foo');
    tick(1000);
    /* Then  */
    component.heroes.subscribe(heroes => {
      expect(mockHeroService.search).toHaveBeenCalledWith('Foo');
      expect(heroes).toEqual(HEROES);
    });
  }));

  it('should not trigger request for empty query', fakeAsync(() => {
    /* Given */
    /* When  */
    component.search(null);
    tick(1000);

    /* Then  */
    component.heroes.subscribe(h => {
      expect(h.length).toEqual(0);
      expect(mockHeroService.search).not.toHaveBeenCalled();
    });
  }));

  it('should swallow error and return empty list', fakeAsync(() => {
    /* Given */
    (mockHeroService.search as Spy).and.returnValue(Observable.throw(new Error('Error during fetch process')));

    /* When  */
    component.search('foo');
    tick(1000);

    /* Then  */
    component.heroes.subscribe(h => {
      expect(h.length).toEqual(0);
      expect(mockHeroService.search).toHaveBeenCalledWith('foo');
    });
  }));

  it('should go to detail of an hero', async(() => {
    /* Given */
    let hero: Hero = {id: 123, name: 'Kevin'};
    /* When  */
    component.gotoDetail(hero);
    /* Then  */
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/detail', 123]);
  }));


});
