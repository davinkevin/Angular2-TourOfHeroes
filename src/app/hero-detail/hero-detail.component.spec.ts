/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {HeroService} from '../shared/hero/hero.service';
import {Location} from '@angular/common';
import Spy = jasmine.Spy;
import {HEROES} from '../shared/hero/mock-heroes';
import {By} from '@angular/platform-browser';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let el: HTMLElement;

  let mockRoute: any, mockHeroService: HeroService, mockLocation: Location;

  beforeEach(() => {
    mockRoute = { params: Observable.from([{ id: 1 }]) };

    mockLocation = jasmine.createSpyObj<Location>('Location', ['back']);

    mockHeroService = jasmine.createSpyObj<HeroService>('HeroService', ['getHero']);
    (mockHeroService.getHero as Spy).and.returnValue(Promise.resolve(HEROES[0]));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HeroDetailComponent ],
      providers: [
        { provide : ActivatedRoute, useValue: mockRoute},
        { provide : HeroService, useValue: mockHeroService},
        { provide : Location, useValue: mockLocation}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;

    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show edition if element is selected', async(() => {
    /* Given */
    /* When  */
    fixture.whenStable().then(() => {
      /* Then  */
      expect(component.hero).toBeDefined();
      expect(component.hero).toEqual(HEROES[0]);
      expect(el.querySelector('h2').textContent).toEqual(`${component.hero.name} details!`);
    });
  }));

  it('should go back with back button', async(() => {
    /* Given */
    fixture.whenStable().then(() => {
      /* When  */
      fixture.debugElement.query(By.css('button')).triggerEventHandler('click', {});

      /* Then  */
      expect(mockLocation.back).toHaveBeenCalled();
    });
  }));
});
