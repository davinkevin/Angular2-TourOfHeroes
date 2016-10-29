/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture, fakeAsync} from '@angular/core/testing';
import {TohComponent} from './toh.component';
import {FormsModule} from '@angular/forms';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroService} from './shared/hero/hero.service';
import {HEROES} from './shared/hero/mock-heroes';
import Spy = jasmine.Spy;

describe('App: Angular2TourOfHeroes', () => {
  let comp: TohComponent;
  let fixture: ComponentFixture<TohComponent>;
  let el: HTMLElement;

  let mockHeroService: HeroService;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj<HeroService>('HeroService', ['getHeroesSlowly']);
    (mockHeroService.getHeroesSlowly as Spy).and.returnValue(Promise.resolve(HEROES));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TohComponent, HeroDetailComponent],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TohComponent);
    el = fixture.debugElement.nativeElement;
    comp = fixture.componentInstance;
  });

  it('should create the comp', async(() => {
    expect(comp).toBeTruthy();
  }));

  it(`should have as title 'Tour of Heroes'`, async(() => {
    expect(comp.title).toEqual('Tour of Heroes');
  }));

  it('should have empty list of heroes attached by default', async(() => {
    expect(comp.heroes).toEqual([]);
  }));

  it('should have no selected heroes defiened', async(() => {
    expect(comp.selectedHero).toBeUndefined();
  }));

  describe('in component lifecycle', () => {

    beforeEach(() => {
      fixture.autoDetectChanges();
    });

    it('should have title in a h1 tag', async(() => {
      expect(el.querySelector('h2').textContent).toContain('My Heroes');
    }));

    it('should have the list of heroes shown', fakeAsync(() => {
      /* Given */
      let actual = HEROES.map(h => h.name);

      /* When  */
      fixture.whenStable() .then(() => {
        let lis = [].slice
          .call(el.querySelectorAll('ul.heroes li'))
          .map(li => li.childNodes[2].textContent.trim());

        /* Then  */
        expect(lis.length).toEqual(10);
        expect(lis).toEqual(actual);
      });
    }));

    it('should show edition if element is selected', async(() => {
      /* Given */
      fixture.whenStable().then(() => {
        let selectedElement = (<HTMLElement> el.querySelector('li:first-child'));

        /* When  */
        selectedElement.click();

        /* Then  */
        expect(comp.selectedHero).toBeDefined();
        expect(comp.selectedHero).toEqual(HEROES[0]);
        expect(selectedElement.className).toEqual('selected');
      });
    }));
  });
});
