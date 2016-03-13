import { Component } from 'angular2/core';
import { CollectionService, CollectionType } from '../../../assets/service-worker';
import { RouterLink } from 'angular2/router';

@Component({
  selector: 'categories',
  viewProviders: [CollectionService],
  template: require('./cats.html'),
  directives: [RouterLink]
})
export class CatsCmp {

  constructor(private wp: CollectionService) {
  }
  ngOnInit(){
    this.wp.Initialize(CollectionType.Categories);
    this.wp.fetch({ filter : { orderby: 'title', order: 'ASC' }});
  }
  loadMore() {
    this.wp.more();
  }
}

