import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { WPCollections, WPEnpoint } from '../wpservice/wp';

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

  constructor(private wp: WPCollections, private _params: RouteParams) {
    this.queryArgs = { perPage: 1, search: _params.get('slug') };
  }
  ngOnInit(){
    this.wp.fetch(WPEnpoint.Users, this.queryArgs).subscribe(
      res=>{
        this.user = res[0];
        this.postsQueryArgs = { filter: { author: this.user.id }};
      },
      err=> console.log(err)
    );
  }
}
