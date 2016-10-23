/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { TohComponent } from './toh.component';
import {FormsModule} from '@angular/forms';
import {BrowserDomAdapter} from '@angular/platform-browser/src/browser/browser_adapter';

describe('App: Angular2TourOfHeroes', () => {

  let fixture: ComponentFixture<TohComponent>,
    compiled: HTMLElement,
    app: TohComponent;

  let heroes = [
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
      declarations: [TohComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TohComponent);
    compiled = fixture.debugElement.nativeElement;
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Tour of Heroes'`, async(() => {
    expect(app.title).toEqual('Tour of Heroes');
  }));

  it('should have list of heroes attached', async(() => {
    expect(app.heroes).toEqual(heroes);
  }));

  it('should have no selected heroes defiened', async(() => {
    expect(app.selectedHero).toBeUndefined();
  }));

  it('should have title in a h1 tag', async(() => {
    /* Given */
    /* When  */
    fixture.detectChanges();
    /* Then  */
    expect(compiled.querySelector('h2').textContent).toContain('My Heroes');
  }));

  it('should have the list of heroes shown', async(() => {
    /* Given */
    let actual = heroes.map(h => h.name);

    /* When  */
    fixture.detectChanges();
    let lis = [].slice.call(compiled.querySelectorAll('ul.heroes li'))
      .map(li => li.childNodes[2].textContent.trim());

    /* Then  */
    expect(lis.length).toEqual(10);
    expect(lis).toEqual(actual);
  }));

  it('should show edition if element is selected', async(() => {
    /* Given */
    fixture.detectChanges();
    let selectedElement = (<HTMLElement> compiled.querySelector('li:first-child'));

    /* When  */
    selectedElement.click();
    fixture.detectChanges();

    /* Then  */
    expect(app.selectedHero).toBeDefined();
    expect(app.selectedHero).toEqual(heroes[0]);
    expect(compiled.querySelectorAll('h2')[1].textContent).toEqual(`${app.selectedHero.name} details!`);
    expect(selectedElement.className).toEqual('selected');
  }));

});
