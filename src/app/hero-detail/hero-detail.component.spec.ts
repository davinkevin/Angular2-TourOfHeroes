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
import {DebugElement} from '@angular/core';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let el: DebugElement;

  let mockRoute: any, mockHeroService: HeroService, mockLocation: Location;

  beforeEach(() => {
    mockRoute = { params: Observable.from([{ id: 1 }]) };

    mockLocation = jasmine.createSpyObj<Location>('Location', ['back']);

    mockHeroService = jasmine.createSpyObj<HeroService>('HeroService', ['findOne', 'update']);
    (mockHeroService.findOne as Spy).and.returnValue(Promise.resolve(HEROES[0]));
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
    el = fixture.debugElement;

    fixture.autoDetectChanges();
  });

  beforeEach(async(() => fixture.whenStable()));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show edition if element is selected', async(() => {
    expect(component.hero).toBeDefined();
    expect(component.hero).toEqual(HEROES[0]);
    expect(el.query(By.css('h2')).nativeElement.textContent).toEqual(`${component.hero.name} details!`);
  }));

  it('should go back with back button', async(() => {
    /* Given */
    let backButton = el.query(By.css('button')).nativeElement;
    /* When  */
    backButton.click();
    /* Then  */
    expect(mockLocation.back).toHaveBeenCalled();
  }));

  it('should update current hero and go back', async(() => {
    /* Given */
    (mockHeroService.update as Spy).and.returnValue(Promise.resolve());
    let saveButton = el.queryAll(By.css('button'))[1].nativeElement;

    /* When  */
    saveButton.click();

    /* Then  */
    expect(mockHeroService.update).toHaveBeenCalledWith(HEROES[0]);
    fixture.whenStable().then(() => { expect(mockLocation.back).toHaveBeenCalled(); });
  }));
});
