import { Component } from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';

import {Media, SidenavService} from 'ng2-material/source/all';
import {AppState} from '../../app.service';

@Component({
  selector: 'header',
  viewProviders: [SidenavService],
  template: require('./header.html'),
  styles: [require('./header.scss')],
  directives: [RouterLink]
})

export class HeaderCmp {

  menu;
  siteTitle;
  constructor(private sidenav: SidenavService,  private appState: AppState, private _router: Router) {
  }
  ngOnInit() {
    var config = this.appState.get().config;
    this.menu = config.menu;
    this.siteTitle = config.site_title;
  }
  /*
   *  Sidebar Main-menu
   */
  goToLink(menuItem) {
    if(menuItem.type == 'Custom Link') window.open(menuItem.url);
    else  {
      let link = [this.routeSwitcher(menuItem.type), {slug: menuItem.slug}]
      this._router.navigate(link);
    }
    this.close('menu');
  }
  routeSwitcher(type){
    switch (type){
      case 'Post' : return '/Post';
      case 'Page' : return '/Page';
      case 'Category' : return '/Blog';
      default: return;
    }
  }

  hasMedia(breakSize: string): boolean {
    return Media.hasMedia(breakSize);
  }
  open(name: string) {
    this.sidenav.show(name);
  }
  close(name: string) {
    this.sidenav.hide(name);
  }
}
