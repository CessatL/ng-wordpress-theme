import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {PostCmp} from '../post/post';

import {WPCollections, WPEnpoint, PostResponse} from '../wpservice/wp';
import {AppState} from "../../app.service";
import {Http} from "angular2/http";


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
  wp: WPCollections;
  constructor(private _params: RouteParams, http: Http, appState: AppState){
    this.wp = new WPCollections(http,WPEnpoint.Posts, appState);
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
    this.wp.fetch(args).subscribe(
      res => {
        this.post = new PostResponse(res[0]);
        this.loadingState = false;
      },
      err => console.log(err)
    );
  }
}



//import {CollectionService, CollectionType, PostResponse} from '../wpservice/wpservice';
//CollectionService],
// private wp: CollectionService,) {
// this.wp.fetch(CollectionType.Posts, args).done((collection)=>{
//   this.post = new PostResponse(collection[0]);
//   this.loadingState = false;
// });
