import {Component} from 'angular2/core';
import {RouteParams} from "angular2/router";
@Component({
  selector: 'blog-posts',
  template: `
    <posts [args]="queryArgs"></posts>
  `
})
export class CatPostsCmp {

  queryArgs;

  constructor(_params:RouteParams) {
    let categorySlug = _params.get('slug');
    this.queryArgs = {_embed: true, perPage: 4, filter: {category_name: categorySlug}};
  }
} 
