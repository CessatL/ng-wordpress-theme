import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {HomeCmp} from './components/home/home';
import {NotFoundCmp} from './components/404/404'
import {PageCmp} from './wp/page/page';
import {HeaderCmp} from './components/header/header';
import {SingleCmp} from './wp/single/single';
import {CatCmp} from './wp/cats/cat';
import {UserCmp} from './wp/users/user';

@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS],
  directives: [ ...ROUTER_DIRECTIVES, HeaderCmp],
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
export class App {
  //use window['app_config'].template_directory for path to your wp theme

  constructor() {
  }
}


