import {Component,DynamicComponentLoader, ElementRef} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {SingleService, CollectionType} from '../../../assets/service-worker';
import {DynamicCmp} from '../../shared/dynamic/dynamic';

@Component({
	selector: 'page',
  viewProviders: [SingleService],
	template: require('./page.html'),
  directives: [DynamicCmp]
})
export class PageCmp {

  slug;

  constructor(private wp:SingleService, private _params:RouteParams) {

    this.slug = _params.get('slug');
  }

  ngOnInit() {
    this.wp.Initialize(CollectionType.Pages);
    this.wp.fetch({perPage: 1, filter: { name: this.slug}});
  }
}
