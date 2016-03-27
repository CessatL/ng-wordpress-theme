import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { WPCollections, WPEnpoint } from '../wpservice/wp';
import {Http} from "angular2/http";
import {AppState} from "../../app.service";

@Component({
  selector: 'user',
  template: `
    <div class="user">
      <h1 class="user-name">
        {{user?.name}}
      </h1>
      <p>{{user?.description}}</p>
      <a [href]="user?.url">{{user?.url}}</a>
      <posts [args]="postsQueryArgs"></posts>
    </div>
  `
})

export class UserCmp {

  user;
  queryArgs;
  postsQueryArgs;
  wp: WPCollections;
  
  constructor(private _params: RouteParams, http: Http, appState: AppState) {
    this.wp = new WPCollections(http, WPEnpoint.Users, appState)
    this.queryArgs = { perPage: 1, search: _params.get('slug') };
  }
  ngOnInit(){
    this.wp.fetch(this.queryArgs).subscribe(
      res=>{
        this.user = res[0];
        this.postsQueryArgs = { filter: { author: this.user.id }};
      },
      err=> console.log(err)
    );
  }
}
