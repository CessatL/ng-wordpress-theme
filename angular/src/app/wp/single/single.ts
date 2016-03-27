import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {PostCmp} from '../post/post';

import {WPCollections, WPEnpoint, PostResponse} from '../wpservice/wp';


@Component({
  selector: 'single',
  template: require('./single.html'),
  directives: [PostCmp]
})
export class SingleCmp {

  slug;
  type;
  post;
  loadingState = false;
  constructor(private _params: RouteParams, private wp: WPCollections){
    this.slug = _params.get('slug');
    this.type = _params.get('type');
  }
  ngOnInit() {
    var args = {
      _embed: true, perPage: 1,
      filter: {
        name: this.slug
      }
    }
    this.loadingState = true;

    this.wp.fetch(WPEnpoint.Posts, args).subscribe((collection)=>{
      this.post = new PostResponse(collection[0]);
      this.loadingState = false;
    });
  }
}



//import {CollectionService, CollectionType, PostResponse} from '../wpservice/wpservice';
//CollectionService],
// private wp: CollectionService,) {
// this.wp.fetch(CollectionType.Posts, args).done((collection)=>{
//   this.post = new PostResponse(collection[0]);
//   this.loadingState = false;
// });
