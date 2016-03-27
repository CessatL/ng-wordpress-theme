/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, OnChanges, SimpleChange} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {AppState} from './app.service';

import {HomeCmp} from './components/home/home';
import {NotFoundCmp} from './components/404/404'
import {PageCmp} from './wp/page/page';
import {HeaderCmp} from './components/header/header';
import {SingleCmp} from './wp/single/single';
import {CatCmp} from './wp/cats/cat';
import {UserCmp} from './wp/users/user';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [AppState],
  directives: [HeaderCmp],
  styles: [require('./app.scss')],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: HomeCmp, name: 'Index' },   //Must take home page id.

  //{ path: '/blog', component: BlogCmp, name: 'Index' },   //Must take blog page id.
  // Async load a component using Webpack's require with es6-promise-loader
  { path: '/page/:slug', component: PageCmp, name: 'Page' },
  { path: '/blog/:slug', component: SingleCmp, name: 'Post' },
  { path: '/category/:slug', component: CatCmp, name: 'Category' },
  { path: '/user/:slug', component: UserCmp, name: 'User' },

  { path: '/**', component: NotFoundCmp, name: 'NotFound' }
])
export class App{

  constructor(public appState: AppState) {
    this.appState.set('loadState', false);
    this.appState.set('config', window['app_config']);  //set our configuration
  }

  ngOnInit() {
  }
  get loadState() {
    return this.appState.get().loadState;
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
