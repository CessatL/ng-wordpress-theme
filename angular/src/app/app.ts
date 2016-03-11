import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {PageCmp} from './components/page/page'
import {HomeCmp} from './components/home/home';
import {HeaderCmp} from './components/header/header';
import {BlogCmp} from './components/blog/blog';
import {SingleCmp} from './components/single/single';
import {CatCmp} from './shared/cats/cat';
import {AuthorCmp} from './shared/author/author';

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
  { path: '/blog/:slug', component: SingleCmp, as: 'Single' },
  { path: '/category/:slug', component: CatCmp, as: 'Category' },
  { path: '/author/:slug', component: AuthorCmp, as: 'Author' },
 // { path: '/blog', loader: () => require('./components/blog/blog')('BlogCmp'), name: 'Blog' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  //use window['template_directory'] for path to your wp theme
  viewLoaded = false;
  constructor() {

  }
  ngOnInit(){
    //$('.button-collapse')['sideNav']();

  }
  //ngAfterViewChecked(){
  //  if(!this.viewLoaded && $('.modal-trigger')['length']){
  //    $('.modal-trigger')['leanModal']();
  //    this.viewLoaded = true;
  //  }
  //}
  slideMenu(){
  }
}
