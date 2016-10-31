/* tslint:disable:no-unused-variable */

import {async, inject, TestBed} from '@angular/core/testing';
import {BaseRequestOptions, Http, HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {HeroService} from './hero.service';

describe('Service: Hero', () => {
  let rootUrl = 'api/heroes';
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService, MockBackend, BaseRequestOptions, {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (b: XHRBackend, o: BaseRequestOptions) => new Http(b, o)
        }
      ],
      imports: [HttpModule]
    });

    mockBackend = TestBed.get(MockBackend);
  });

  it('should provide HeroService by DI',
    inject([HeroService], (service: HeroService) => { expect(service).toBeTruthy(); }));

  it('should provide a list of Heroes', async(inject([HeroService], (heroService: HeroService) => {
    /* Given */
    let data = [{id: 1, name: 'Foo'}, {id: 2, name: 'Bar'}];
    let conn: MockConnection;
    mockBackend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({body: {data}})));
      conn = c;
    });

    /* When */
    heroService.findAll().then((heroes) => { expect(heroes).toEqual(data); });

    /* Then */
    expect(conn.request.method).toEqual(RequestMethod.Get);
    expect(conn.request.url).toEqual(rootUrl);
  })));

  it('should get hero by id', async(inject([HeroService], (heroService: HeroService) => {
    /* Given */
    let data = {id: 1, name: 'Foo'};
    let conn: MockConnection;
    mockBackend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({body: {data}})));
      conn = c;
    });

    /* When */
    heroService.findOne(1).then(h => { expect(h).toEqual(data); });

    /* Then */
    expect(conn.request.method).toEqual(RequestMethod.Get);
    expect(conn.request.url).toEqual(`${rootUrl}/${data.id}`);
  })));

  it('should create hero', async(inject([HeroService], (heroService: HeroService) => {
    /* Given */
    let data = {id: 1, name: 'Foo'};
    let conn: MockConnection;
    mockBackend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({body: {data}})));
      conn = c;
    });

    /* When  */
    heroService.create(data.name).then(h => { expect(h).toEqual(data); });

    /* Then  */
    expect(conn.request.method).toEqual(RequestMethod.Post);
    expect(conn.request.url).toEqual(rootUrl);
  })));

  it('should update hero', async(inject([HeroService], (heroService: HeroService) => {
    /* Given */
    let hero = {id: 1, name: 'Foo'};
    let conn: MockConnection;
    mockBackend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({})));
      conn = c;
    });

    /* When  */
    heroService.update(hero).then(h => { expect(h).toEqual(hero); });

    /* Then  */
    expect(conn.request.method).toEqual(RequestMethod.Put);
    expect(conn.request.url).toEqual(`${rootUrl}/${hero.id}`);
  })));

  it('should delete hero', async(inject([HeroService], (heroService: HeroService) => {
    /* Given */
    let heroId = 1;
    let conn: MockConnection;
    mockBackend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({})));
      conn = c;
    });

    /* When  */
    heroService.delete(heroId);

    /* Then  */
    expect(conn.request.method).toEqual(RequestMethod.Delete);
    expect(conn.request.url).toEqual(`${rootUrl}/${heroId}`);
  })));

  it('should search for heroes by name', async(inject([HeroService], (heroService: HeroService) => {
    /* Given */
    let data = [{id: 1, name: 'Foo'}, {id: 2, name: 'Far'}];
    let conn: MockConnection;
    mockBackend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({body: {data}})));
      conn = c;
    });

    /* When */
    heroService.search('F').subscribe((heroes) => { expect(heroes).toEqual(data); });

    /* Then */
    expect(conn.request.method).toEqual(RequestMethod.Get);
    expect(conn.request.url).toEqual(`${rootUrl}?name=F`);
  })));

  it('should get an error from JS stack', async(inject([HeroService], (heroService: HeroService) => {
    /* Given */
    let message = 'Error during fetch of elements';
    let errorResponse = new Error(message);
    let conn: MockConnection;
    mockBackend.connections.subscribe((c: MockConnection) => {
      c.mockError(errorResponse);
      conn = c;
    });

    /* When */
    heroService.findAll().catch((e: Error) => {
      /* Then */
      expect(e).toEqual(message);
    });
  })));

  it('should get an error from as message', async(inject([HeroService], (heroService: HeroService) => {
    /* Given */
    let message = 'Error during fetch of elements';
    let conn: MockConnection;
    mockBackend.connections.subscribe((c: MockConnection) => {
      c.mockError(message as Error);
      conn = c;
    });

    /* When */
    heroService.findAll().catch((e: Error) => {
      /* Then */
      expect(e).toEqual(message);
    });
  })));


});
