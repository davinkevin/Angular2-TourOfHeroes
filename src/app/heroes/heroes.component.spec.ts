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
    mockHeroService = jasmine.createSpyObj<HeroService>('HeroService', ['findAll', 'create', 'delete']);
    (mockHeroService.findAll as Spy).and.returnValue(Promise.resolve(HEROES));
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
      let lis = el.queryAll(By.css('ul.heroes li span:nth-child(2)'))
        .map(li => li.nativeNode.textContent.trim());

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

    it('should have selected style if one hero is selected', async(() => {
      /* Then  */
      expect(component.selectedHero).toBeDefined();
      expect(component.selectedHero).toEqual(HEROES[0]);
      expect(selectedElement.classes['selected']).toBeTruthy();
    }));

    it('should go to details when click on button', async(() => {
      /* When */
      el.query(By.css('.sub-detail button')).nativeElement.click();

      /* Then  */
      expect(mockRouter.navigate).toHaveBeenCalledWith([ '/detail', 11 ]);
    }));

  });

  describe('add a new hero', () => {

    let nameInput: DebugElement, addButton: DebugElement;

    beforeEach(async(() => {
      fixture.whenStable().then(() => {
        /* Given */
        nameInput = el.query(By.css('.add input'));
        addButton = el.query(By.css('.add button'));
      });
    }));

    it('should do nothing because name is empty', async(() => {
      /* Given */
      let name = '    ';

      /* When  */
      nameInput.nativeElement.value = name;
      addButton.nativeElement.click();

      /* Then  */
      fixture.whenStable().then(() => {
        expect(mockHeroService.create).not.toHaveBeenCalled();
        expect(nameInput.nativeElement.value).toEqual('');
      });
    }));

    it('should add a new hero to the list while another is selected', async(() => {
      /* Given */
      let name = 'FooHero !!';
      let initialSize = HEROES.length;
      let fooHero = {id: 123, name};
      component.selectedHero = {id: 12, name: 'another hero'};
      (mockHeroService.create as Spy).and.returnValue(Promise.resolve(fooHero));

      /* When  */
      nameInput.nativeElement.value = name;
      addButton.nativeElement.click();

      /* Then  */
      fixture.whenStable().then(() => {
        expect(component.heroes.length).toBeGreaterThan(initialSize);
        expect(component.heroes).toContain(fooHero);
        expect(component.selectedHero).toBeNull();
        expect(mockHeroService.create).toHaveBeenCalledWith(name);
      });
    }));

  });

  describe('delete an hero', () => {

    let firstHeroDeleteButton: DebugElement;

    beforeEach(async(() => {
      fixture.whenStable().then(() => {
        firstHeroDeleteButton = el.query(By.css('li:first-child button'));
      });
    }));

    it('should delete an hero when clicking the delete button with the same selected', async(() => {
      /* Given */
      (mockHeroService.delete as Spy).and.returnValue(Promise.resolve());
      let originalLength = HEROES.length;
      let originalHero = HEROES[0];
      component.selectedHero = originalHero;

      /* When  */
      firstHeroDeleteButton.nativeElement.click();

      /* Then  */
      fixture.whenStable().then(() => {
        expect(originalLength).toEqual(el.queryAll(By.css('.heroes li')).length + 1);
        expect(component.heroes).not.toContain(originalHero);
        expect(mockHeroService.delete).toHaveBeenCalledWith(11);
        expect(component.selectedHero).toBeNull();
      });
    }));

    it('should delete an hero when clicking the delete button', async(() => {
      /* Given */
      (mockHeroService.delete as Spy).and.returnValue(Promise.resolve());
      let originalLength = HEROES.length;
      let originalHero = HEROES[0];

      /* When  */
      firstHeroDeleteButton.nativeElement.click();

      /* Then  */
      fixture.whenStable().then(() => {
        expect(originalLength).toEqual(el.queryAll(By.css('.heroes li')).length + 1);
        expect(component.heroes).not.toContain(originalHero);
        expect(mockHeroService.delete).toHaveBeenCalledWith(11);
      });
    }));

  });

});
