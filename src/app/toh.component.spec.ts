/* tslint:disable:no-unused-variable */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {TohComponent} from './toh.component';

import Spy = jasmine.Spy;
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('App: Angular2TourOfHeroes', () => {
  let comp: TohComponent;
  let fixture: ComponentFixture<TohComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TohComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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

  it('should have title in html', async(() => {
    /* Given */
    fixture.detectChanges();

    /* When  */
    let title = el.querySelector('h1').textContent;

    /* Then  */
    expect(comp.title).toEqual(title);
  }));

});
