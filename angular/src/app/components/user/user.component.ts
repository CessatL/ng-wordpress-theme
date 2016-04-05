import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {WPCollections, WPEndpoint} from '../../wp';
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

  constructor(_params: RouteParams, http: Http, private appState: AppState) {
    this.wp = new WPCollections(http, WPEndpoint.Users, appState)
    this.queryArgs = { perPage: 1, search: _params.get('slug') };
  }
  ngOnInit(){
    this.appState.set('loadState', true);
    this.wp.fetch(this.queryArgs).subscribe(
      res=>{
        this.user = res[0];
        this.postsQueryArgs = { _embed: true, filter: { author: this.user.id }};
        this.appState.set('loadState', false);
      },
      err=> console.log(err)
    );
  }
}
