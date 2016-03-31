import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {CatPostsCmp} from "./cat_posts";

@Component({
  selector: 'blog',
  template: `
    <div class="container">
      <h1>Blog Page</h1>
      <div flex layout="row">
        <categories></categories>
        <router-outlet></router-outlet>
      </div>
    </div> 
  `
})

@RouteConfig([
  {path: '/', name: 'RecentPosts', component: CatPostsCmp, useAsDefault: true},
  {path: '/:slug', name: 'CatPosts', component: CatPostsCmp}
])

export class BlogCmp {
}

