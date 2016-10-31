/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import {HeroService} from '../shared/hero/hero.service';
import {HEROES} from '../shared/hero/mock-heroes';
import Spy = jasmine.Spy;
import {Router} from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let el: HTMLElement;

  let mockHeroService: HeroService, mockRouter: Router;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj<HeroService>('HeroService', ['findAll']);
    (mockHeroService.findAll as Spy).and.returnValue(Promise.resolve(HEROES));

    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
        {provide: Router, useValue: mockRouter}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;

    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have five heroes showed', async(() => {
    let heroesName = HEROES.slice(1, 5).map(h => h.name);

    /* Given */
    fixture.whenStable().then(() => {
      /* When  */
      let heroesInDashBoard = [].slice.call(el.querySelectorAll('h4')).map(n => n.textContent );

      /* Then  */
      expect(heroesInDashBoard.length).toBe(4);
      expect(heroesInDashBoard).toEqual(heroesName);
    });
  }));

  it('should have five heroes shown', async(() => {
    /* Given */
    fixture.whenStable().then(() => {
      /* When  */
      (el.querySelector('h4:first-child') as HTMLElement).click();

      /* Then  */
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/detail', 12]);
    });
  }));
});
