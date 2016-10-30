/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeroesComponent } from './heroes.component';
import {Router} from '@angular/router';
import {HeroService} from '../shared/hero/hero.service';
import Spy = jasmine.Spy;
import {HEROES} from '../shared/hero/mock-heroes';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let el: DebugElement;
  let mockRouter: Router, mockHeroService: HeroService;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockHeroService = jasmine.createSpyObj<HeroService>('HeroService', ['getHeroes']);
    (mockHeroService.getHeroes as Spy).and.returnValue(Promise.resolve(HEROES));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the list of heroes shown', async(() => {
    /* Given */
    let actual = HEROES.map(h => h.name);

    /* When  */
    fixture.whenStable().then(() => {
      let lis = el.queryAll(By.css('ul.heroes li'))
        .map(li => li.childNodes[2].nativeNode.textContent.trim());

      /* Then  */
      expect(lis.length).toEqual(10);
      expect(lis).toEqual(actual);
    });
  }));

  it('should not display selected hero part if none selected', async(() => {
      fixture.whenStable().then(() => {
        expect(el.queryAll(By.css('h2')).length).toBe(1);
      });
  }));

  describe('with first hero selected', () => {

    let selectedElement: DebugElement;

    beforeEach(async(() => {
      fixture.whenStable().then(() => {
        /* Given */
        selectedElement = el.query(By.css('li:first-child'));
        /* When  */
        selectedElement.nativeElement.click();
      });
    }));

    it('should show edition if element is selected', async(() => {
        /* Then  */
        expect(component.selectedHero).toBeDefined();
        expect(component.selectedHero).toEqual(HEROES[0]);
        expect(selectedElement.classes['selected']).toBeTruthy();
    }));

    it('should go to details when click on button', async(() => {
      /* When */
      el.query(By.css('button')).nativeElement.click();

      /* Then  */
      expect(mockRouter.navigate).toHaveBeenCalledWith([ '/detail', 11 ]);
    }));

  });


});
