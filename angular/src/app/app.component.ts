import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig} from 'angular2/router';

import {AppState} from './app.service';

import {HomeCmp, NotFoundCmp, PageCmp, SingleCmp, UserCmp, BlogCmp} from './components';

@Component({
  selector: 'app',
  styles: [require('./app.scss')],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html'),
  // host: {
  //   '(window:scroll)': 'getOffsetTop()'
  // }
})
@RouteConfig([
  { path: '/', component: HomeCmp, name: 'Index' , useAsDefault: true},
  { path: '/page/:slug', component: PageCmp, name: 'Page' },
  { path: '/single/:slug', component: SingleCmp, name: 'Post' },
  { path: '/user/:slug', component: UserCmp, name: 'User' },
  { path: '/blog/...', component: BlogCmp, name: 'Blog' },
  { path: '/**', component: NotFoundCmp, name: 'NotFound' }
])
export class App  {

  constructor(public appState: AppState) {
    this.appState.set('config', window['app_config']);  //set our configuration
  }

}
