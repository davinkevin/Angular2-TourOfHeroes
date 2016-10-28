/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import {FormsModule} from '@angular/forms';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HeroDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show edition if element is selected', async(() => {
    /* Given */
    let hero = { id: 1, name: 'SuperTestingMan' };

    /* When  */
    component.hero = hero;
    fixture.detectChanges();

    /* Then  */
    expect(component.hero).toBeDefined();
    expect(component.hero).toEqual(hero);
    expect(el.querySelector('h2').textContent).toEqual(`${component.hero.name} details!`);
  }));
});
