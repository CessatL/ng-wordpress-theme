import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { SingleService,CollectionType } from '../../../assets/service-worker';

@Component({
  selector: 'user',
  viewProviders: [SingleService],
  template: `
    <div class="user">
      <h1 class="user-name">
        {{wp.results?.name}}
      </h1>
      <p>{{wp.author?.description}}</p>
      <a [href]="wp.results?.url">{{wp.results?.url}}</a>
    </div>
  `
})

export class UserCmp {

  slug;
  constructor(private wp: SingleService, private _params: RouteParams) {
    this.slug = _params.get('slug');
  }
  ngOnInit(){
    this.wp.Initialize(CollectionType.Users);
    this.wp.fetch({ perPage: 1, search: this.slug });
  }
}
