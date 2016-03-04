import { Component } from 'angular2/core';
import { CatsService } from '../../../assets/service-worker';
import { RouterLink } from 'angular2/router';

@Component({
  selector: 'categories',
  viewProviders: [CatsService],
  template: require('./cats.html'),
  directives: [RouterLink]
})
export class CatsCmp {

  constructor(private wp: CatsService) {
  }
  ngOnInit(){
    this.wp.fetchCats();
  }
  loadMore() {
    this.wp.fetchMore();

  }
}

