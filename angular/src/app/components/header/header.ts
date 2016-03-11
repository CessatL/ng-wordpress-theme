import { Component } from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { RouterActive } from './router-active';

import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS, Media, SidenavService} from 'ng2-material/source/all';

@Component({
  selector: 'header',
  viewProviders: [MATERIAL_PROVIDERS],
  template: require('./header.html'),
  styles: [require('./header.css')],
  directives: [RouterLink, RouterActive, MATERIAL_DIRECTIVES]
})

export class HeaderCmp {

  menu;
  siteTitle
  constructor(private sidenav: SidenavService) {
  }
  ngOnInit() {
    this.menu = window['main_menu'];
    this.siteTitle = window['site_title'];
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
