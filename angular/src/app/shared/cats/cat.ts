import { Component } from 'angular2/core';
import {RouteParams} from 'angular2/router'
import { CatService } from '../../../assets/service-worker';

@Component({
  selector: 'category',
  viewProviders: [CatService],
  template: require('./cat.html')
})

export class CatCmp {

  slug: string;
  constructor(private wp: CatService, private _params: RouteParams) {
    this.slug = _params.get('slug');
  }
  ngOnInit(){
   this.wp.fetchCat(this.slug);
  }
}
