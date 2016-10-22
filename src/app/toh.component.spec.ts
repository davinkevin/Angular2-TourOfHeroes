/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TohComponent } from './toh.component';

describe('App: Angular2TourOfHeroes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TohComponent
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(TohComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(TohComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(TohComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('My First Angular App');
  }));
});
