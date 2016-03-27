import { Component } from 'angular2/core';
import {RouteParams} from 'angular2/router'
import { WPCollections, WPEnpoint } from '../wpservice/wp';

@Component({
  selector: 'category',
  template: require('./cat.html')
})

export class CatCmp {

  category;
  queryArgs;
  postsQueryArgs;

  constructor(private wp: WPCollections, private _params: RouteParams) {
    this.queryArgs = { perPage: 1, search: _params.get('slug') };
  }
  ngOnInit(){
    this.wp.fetch(WPEnpoint.Categories, this.queryArgs).subscribe(
      res=>{
        this.category = res[0];
        this.postsQueryArgs = { _embed: true, filter: { cat: this.category.id }};
      },
      err => console.log(err)
    );
  }
}
