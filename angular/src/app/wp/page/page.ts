import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
//import {CollectionService, CollectionType} from '../wpservice/wpservice';
import {WPCollections, WPEnpoint} from '../wpservice/wp';
import {DynamicCmp} from '../../shared/dynamic/dynamic';

@Component({
	selector: 'page',
	template: require('./page.html'),
  styles: [require('./page.scss')],
  directives: [DynamicCmp]
})
export class PageCmp {

  slug;
  page;
  loadingState = false;
  constructor(private _params:RouteParams, private wp: WPCollections) {

    this.slug = _params.get('slug');
  }

  ngOnInit() {
    this.loadingState = true;
    var queryArgs = { filter: { name: this.slug}}

    this.wp.fetch(WPEnpoint.Pages, queryArgs).subscribe((res)=>{
      this.page = res[0];
      this.loadingState = false;
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
