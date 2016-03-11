import {Component,DynamicComponentLoader, ElementRef} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {PageService} from '../../../assets/service-worker';
import {DynamicCmp} from '../../shared/dynamic/dynamic';

@Component({
	selector: 'page',
  viewProviders: [PageService],
	template: require('./page.html'),
  directives: [DynamicCmp]
})
export class PageCmp {

  slug;

  constructor(private wp:PageService, private _params:RouteParams) {

    this.slug = _params.get('slug');
  }

  ngOnInit() {
    this.wp.getPage(this.slug);
  }
}
