import { Component } from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { RouterActive } from './router-active';

import {Media, SidenavService} from 'ng2-material/source/all';
import {AppState} from '../../app.service';

@Component({
  selector: 'header',
  viewProviders: [SidenavService],
  template: require('./header.html'),
  styles: [require('./header.css')],
  directives: [RouterLink, RouterActive]
})

export class HeaderCmp {

  menu;
  siteTitle;
  constructor(private sidenav: SidenavService,  private appState: AppState) {
  }
  ngOnInit() {
    var config = this.appState.get().config;
    console.log(config.menu);
    this.menu = config.menu; 
    this.siteTitle = config.site_title;
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
