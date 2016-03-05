import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { AuthorService } from '../../../assets/service-worker';

@Component({
  selector: 'author',
  viewProviders: [AuthorService],
  template: `
    <div class="author">
      <h1 class="author-name">
        {{wp.author?.name}}
      </h1>
      <p>{{wp.author?.description}}</p>
      <a [href]="wp.author?.url">{{wp.author?.url}}</a>
    </div>
  `
})

export class AuthorCmp {

  slug;
  constructor(private wp: AuthorService, private _params: RouteParams) {
    this.slug = _params.get('slug');
  }
  ngOnInit(){
    this.wp.fetchAuthor(this.slug);
  }
}
