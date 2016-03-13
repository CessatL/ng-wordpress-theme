import { Component } from 'angular2/core';
import {RouteParams} from 'angular2/router'
import { SingleService, CollectionType } from '../../../assets/service-worker';

@Component({
  selector: 'category',
  viewProviders: [SingleService],
  template: require('./cat.html')
})

export class CatCmp {

  slug;
  constructor(private wp: SingleService, private _params: RouteParams) {
    this.slug = _params.get('slug');
  }
  ngOnInit(){
    this.wp.Initialize(CollectionType.Categories);
    this.wp.fetch({ perPage: 1, search: this.slug });
  }
}
