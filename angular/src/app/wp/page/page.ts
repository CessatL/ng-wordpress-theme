import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {WPCollections, WPEnpoint} from '../wpservice/wp';
import {DynamicCmp} from '../../shared/dynamic/dynamic';
import{AppState} from '../../app.service';
import {Http} from "angular2/http";

@Component({
	selector: 'page',
	template: require('./page.html'),
  styles: [require('./page.scss')],
  directives: [DynamicCmp]
})
export class PageCmp {

  slug;
  page;
  wp: WPCollections;
  constructor(private _params:RouteParams, http: Http, appState: AppState) {
    this.wp = new WPCollections(http, WPEnpoint.Pages, appState)
    this.slug = _params.get('slug');
  }

  ngOnInit() {
    //this.appState.set('loadState', true);
    var queryArgs = { filter: { name: this.slug}}

    this.wp.fetch(queryArgs).subscribe((res)=>{
      this.page = res[0];
      //this.appState.set('loadState', false);
    });
  }

  pageTitle() {
    if(this.page)
      return this.page.title.rendered;
  }
  pageContent() {
    if(this.page)
      return this.page.content.rendered;
  }
}
