import { Input, Component } from 'angular2/core';
import { PostCmp } from './../post/post';
import { CollectionService } from '../../../assets/service-worker';

@Component({
  selector: 'posts',
  viewProviders: [CollectionService],
  template: require('./posts.html'),
  styles: [require('./posts.css')],
  directives: [PostCmp]
})
export class PostsCmp {

  @Input() perPage:number;
  @Input() page:number;
  @Input() type:string;

  constructor(private service: CollectionService) {
  }
  ngOnInit(){
    this.service.fetchPosts(this.perPage, this.page, this.type);
  }
  loadMore() {
    this.service.fetchMore();
  }
}