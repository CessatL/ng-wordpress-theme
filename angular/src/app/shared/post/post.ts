import { Input, Component } from 'angular2/core';
import { DatePipe } from '../../pipes/date';
//import { ShareCmp } from '../share/share';
//import { CommentCmp } from '../disqus/disqus';

@Component({
  selector: 'post',
 // providers: [SinglePost],
  template: require('./post.html'),
  //directives: [ShareCmp, CommentCmp],
  pipes: [DatePipe]
})
export class PostCmp {
  @Input() post;

  constructor() {
  }
  ngOnInit(){

  }
}
