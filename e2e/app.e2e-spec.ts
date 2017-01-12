import { WpAppPage } from './app.po';

describe('wp-app App', function() {
  let page: WpAppPage;

  beforeEach(() => {
    page = new WpAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
