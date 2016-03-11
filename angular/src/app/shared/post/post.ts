import { Input, Component } from 'angular2/core';
import { RouterLink} from 'angular2/router';
import { DatePipe } from '../../pipes/date';
//import { Parallax, ParallaxConfig } from 'ng2-parallax/parallax-ts';

@Component({
  selector: 'post',
  template: require('./post.html'),
  styles: [require('./post.css')],
  directives: [RouterLink],
  pipes: [DatePipe]
})
export class PostCmp {
  @Input() post;
  @Input() expanded;
  constructor() {
  }
}
