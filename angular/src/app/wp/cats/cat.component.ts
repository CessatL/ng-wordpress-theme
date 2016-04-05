import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router'
import {Http} from "angular2/http";
import {AppState} from "../../app.service";
import {WPCollections, WPEndpoint} from "../service/wp.service";

@Component({
  selector: 'category',
  template: require('./cat.html')
})

export class CatCmp {

  category;
  queryArgs;
  postsQueryArgs;
  wp:WPCollections;

  constructor(private _params:RouteParams, http:Http, private appState:AppState) {
    this.wp = new WPCollections(http, WPEndpoint.Categories, appState);
    this.queryArgs = {perPage: 1, search: _params.get('slug')};
  }

  ngOnInit() {
    this.appState.set('loadState', true);
    this.wp.fetch(this.queryArgs).subscribe(
      res=> {
        this.category = res[0];
        this.postsQueryArgs = {_embed: true, filter: {cat: this.category.id}};
        this.appState.set('loadState', false);
      },
      err => console.log(err)
    );
  }
}
