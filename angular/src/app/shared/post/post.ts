import { Input, Component } from 'angular2/core';
import { RouterLink} from 'angular2/router';
import { DatePipe } from '../../pipes/date';
//import { ShareCmp } from '../share/share';
//import { CommentCmp } from '../disqus/disqus';

@Component({
  selector: 'post',
  template: require('./post.html'),
  styles: [require('./post.css')],
  directives: [RouterLink],
  pipes: [DatePipe]
})
export class PostCmp {
  @Input() post;

  constructor() {
  }
}
