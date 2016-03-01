import { Input, Component } from 'angular2/core';
import { DatePipe } from '../../pipes/date';

import { PostsCollection } from '../../../assets/service-worker';

@Component({
    selector: 'posts',
    viewProviders: [PostsCollection],
    template: require('./posts.html'),
    styles: [require('./posts.css')],
    pipes: [DatePipe]
})
export class PostsCmp {

  @Input() perPage:number;
  @Input() page:number;
  @Input() type:string;

  constructor(private service: PostsCollection) {
  }
  ngOnInit(){
    this.service.fetchPosts(this.perPage, this.page, this.type);
  }
  loadMore() {
    this.service.fetchMore();
  }
}
