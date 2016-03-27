import {Input, Component, OnChanges, SimpleChange} from 'angular2/core';
import {WPCollections, WPEnpoint, PostResponse} from '../wpservice/wp';

@Component({
  selector: 'posts',
  template: require('./posts.html'),
  styles: [require('./posts.css')]
})
export class PostsCmp implements OnChanges  {

  @Input() args;
  @Input() featuredImageSize = 'medium';

  posts = new Array<PostResponse>();
  loadingState = false;


  constructor(private wp: WPCollections) {
  }
  ngOnInit(){
  }
  fetch(args) {
    this.posts.length = 0; //reset our posts array
    this.loadingState = true;
    this.wp.fetch(WPEnpoint.Posts, args).subscribe(
      res => {
        for (var post of res) {
          this.posts.push(new PostResponse(post));
        }
        this.loadingState = false;
      },
      err => this.onError(err)
    );
  }

  onError(err){
    console.log('Fetch Collection : ' + err);
  }
  more() {
    this.loadingState = true;
    this.wp.more().subscribe(
      res => {
        for(var post of res) {
          this.posts.push(new PostResponse(post));
        }
        this.loadingState = false;
      },
      err => this.onError(err)

    );
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    if (changes['args'] && changes['args'].currentValue != null){
      this.fetch(changes['args'].currentValue);
    }
  }
}
