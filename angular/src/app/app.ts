import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {HomeCmp} from './components/home/home';
import {MenuCmp} from './shared/menu/menu';
import {BlogCmp} from './components/blog/blog';
import {SingleCmp} from './components/single/single';
import {CatsCmp} from './shared/cats/cats';
import {CatCmp} from './shared/cats/cat';

@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES, MenuCmp, BlogCmp, SingleCmp, CatsCmp],
  styles: [require('./app.css')],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: HomeCmp, name: 'Index' },
  // Async load a component using Webpack's require with es6-promise-loader
  { path: '/blog', component: BlogCmp, name: 'Blog' },
  { path: '/blog/:slug', component: SingleCmp, as: 'Single' },
  { path: '/category', component: CatsCmp, as: 'Cats' },
  { path: '/category/:slug', component: CatCmp, as: 'Category' },
 // { path: '/blog', loader: () => require('./components/blog/blog')('BlogCmp'), name: 'Blog' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  //use window['template_directory'] for path to your wp theme
  constructor() {
  }
}
