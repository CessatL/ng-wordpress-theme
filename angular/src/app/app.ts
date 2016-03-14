import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {HomeCmp} from './components/home/home';
import {NotFoundCmp} from './components/404/404'
import {PageCmp} from './components/page/page';
import {HeaderCmp} from './components/header/header';
import {SingleCmp} from './components/single/single';
import {CatCmp} from './shared/cats/cat';
import {UserCmp} from './shared/users/user';

@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS],
  directives: [ ...ROUTER_DIRECTIVES, HeaderCmp],
  styles: [require('./app.scss')],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: HomeCmp, name: 'Index' },
  // Async load a component using Webpack's require with es6-promise-loader
  { path: '/page/:slug', component: PageCmp, name: 'Page' },
  { path: '/blog/:slug', component: SingleCmp, name: 'Single' },
  { path: '/category/:slug', component: CatCmp, name: 'Category' },
  { path: '/user/:slug', component: UserCmp, name: 'User' },
 // { path: '/blog', loader: () => require('./components/blog/blog')('BlogCmp'), name: 'Blog' },
  { path: '/**', component: NotFoundCmp, name: 'NotFound' }
])
export class App {
  //use window['template_directory'] for path to your wp theme
  constructor() {}
}


