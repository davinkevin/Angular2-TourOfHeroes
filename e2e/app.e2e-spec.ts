import { Angular2TourOfHeroesPage } from './app.po';

describe('angular2-tour-of-heroes App', function() {
  let page: Angular2TourOfHeroesPage;

  beforeEach(() => {
    page = new Angular2TourOfHeroesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
