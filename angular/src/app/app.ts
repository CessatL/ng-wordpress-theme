import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig} from 'angular2/router';

import {AppState} from './app.service';
import {LoaderCmp} from './shared/loader/loader';

import {HomeCmp} from './components/home/home';
import {NotFoundCmp} from './components/404/404'
import {PageCmp} from './wp/page/page';
import {HeaderCmp} from './components/header/header';
import {SingleCmp} from './wp/single/single';
import {UserCmp} from './wp/users/user';
import {BlogCmp} from "./components/blog/blog";

@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [HeaderCmp, LoaderCmp],
  styles: [require('./app.scss')],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
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
