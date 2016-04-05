import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {CatPostsCmp} from "./cat_posts.component";

@Component({
  selector: 'blog',
  template: `
    <div class="page-title container">
      <h1>Blog Page</h1>
    </div> 
    <div class="blog-content container">
        <categories class="scrollable" fillViewHeight></categories>
        <router-outlet></router-outlet>
    </div>
  
  `,
  styles: [` 
    .blog-content{
      position: relative; 
    }
    
    categories{
      position: fixed;
    }
  `]
})

@RouteConfig([
  {path: '/', name: 'RecentPosts', component: CatPostsCmp, useAsDefault: true},
  {path: '/:slug', name: 'CatPosts', component: CatPostsCmp}
])

export class BlogCmp {
  
}

