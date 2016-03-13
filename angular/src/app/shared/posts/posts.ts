import { Input, Component } from 'angular2/core';
import { CollectionService, CollectionType } from '../../../assets/service-worker';

@Component({
  selector: 'posts',
  viewProviders: [CollectionService],
  template: require('./posts.html'),
  styles: [require('./posts.css')]
})
export class PostsCmp {

  @Input() args;

  constructor(private wp: CollectionService) {
  }
  ngOnInit(){
    this.wp.Initialize(CollectionType.Posts);
    this.wp.fetch(this.args);
  }
  loadMore() {
    this.wp.more();
  }
}
