/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {TohComponent} from './toh.component';
import {FormsModule} from '@angular/forms';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {Hero} from './shared/hero';

describe('App: Angular2TourOfHeroes', () => {
  let comp: TohComponent;
  let fixture: ComponentFixture<TohComponent>;
  let el: HTMLElement;

  let heroes: Hero[] = [
    {id: 11, name: 'Mr. Nice'},
    {id: 12, name: 'Narco'},
    {id: 13, name: 'Bombasto'},
    {id: 14, name: 'Celeritas'},
    {id: 15, name: 'Magneta'},
    {id: 16, name: 'RubberMan'},
    {id: 17, name: 'Dynama'},
    {id: 18, name: 'Dr IQ'},
    {id: 19, name: 'Magma'},
    {id: 20, name: 'Tornado'}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TohComponent, HeroDetailComponent]
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

  it('should have list of heroes attached', async(() => {
    expect(comp.heroes).toEqual(heroes);
  }));

  it('should have no selected heroes defiened', async(() => {
    expect(comp.selectedHero).toBeUndefined();
  }));

  it('should have title in a h1 tag', async(() => {
    /* Given */
    /* When  */
    fixture.detectChanges();
    /* Then  */
    expect(el.querySelector('h2').textContent).toContain('My Heroes');
  }));

  it('should have the list of heroes shown', async(() => {
    /* Given */
    let actual = heroes.map(h => h.name);

    /* When  */
    fixture.detectChanges();
    let lis = [].slice
      .call(el.querySelectorAll('ul.heroes li'))
      .map(li => li.childNodes[2].textContent.trim());

    /* Then  */
    expect(lis.length).toEqual(10);
    expect(lis).toEqual(actual);
  }));

  it('should show edition if element is selected', async(() => {
    /* Given */
    fixture.detectChanges();
    let selectedElement = (<HTMLElement> el.querySelector('li:first-child'));

    /* When  */
    selectedElement.click();
    fixture.detectChanges();

    /* Then  */
    expect(comp.selectedHero).toBeDefined();
    expect(comp.selectedHero).toEqual(heroes[0]);
    expect(selectedElement.className).toEqual('selected');
  }));

});
