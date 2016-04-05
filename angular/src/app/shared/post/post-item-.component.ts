import {Input, Component, ElementRef} from 'angular2/core';


@Component({
  selector: 'post-item-mini',
  template: `

  `,
  styles: [require('./post.scss')]
})
export class PostItemMiniCmp {
  @Input() post;
  @Input() featuredImageSize = 'small';

  constructor(private  el:ElementRef) {

  }

}
