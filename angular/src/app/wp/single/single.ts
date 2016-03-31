import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {WPCollections, WPEndpoint, PostResponse} from '../wpservice/wp';
import {AppState} from "../../app.service";
import {Http} from "angular2/http";
import {PostCmp} from '../post/post';


@Component({
  selector: 'single',
  template: require('./single.html')
})
export class SingleCmp {

  slug;
  type;
  post;
  wp: WPCollections;
  constructor(private _params: RouteParams, http: Http,private appState: AppState){
    this.wp = new WPCollections(http, WPEndpoint.Posts, appState);
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
    this.appState.set('loadState', true);
    this.wp.fetch(args).subscribe(
      res => {
        this.post = new PostResponse(res[0]);
        this.appState.set('loadState', false);
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
