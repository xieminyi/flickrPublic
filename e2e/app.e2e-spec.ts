import { AppPage } from './app.po';

describe('flickr-image App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Flickr Public Feeds Images');
  });
});
