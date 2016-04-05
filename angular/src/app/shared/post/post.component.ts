import {Input, Component, ElementRef} from 'angular2/core';
import { Parallax } from './../parallax/parallax.directive';
  

@Component({
  selector: 'post',
  template: ` 
   <div class="post-card">
      <div class="post-header" fillViewHeight>
        <div class="post-image" *ngIf="post.featuredMedia()" parallax [config]="parallaxConfig" 
        [style.background]="'url(' + post.featuredImage(featuredImageSize) +')'">
        </div>
        <div class="post-interface container">
          <div class="post-title">
            <h1>{{post.title()}}</h1>
          </div>
        </div>
      </div>
      <div class="post-body container">
        <div class="post-content" [innerHtml]="post.content()"></div>
      </div>
      <div class="post-share container"></div>
      <div class="post-tags container">
        <h4>Keywords:</h4>
        <span *ngFor="#tag of post.tags()">{{tag.name}}</span>
      </div>
      <div class="post-comments container"></div>
    </div>
  `,
  styles: [require('./post.scss')],
  directives: [Parallax]
})
export class PostCmp {
  @Input() post;
  @Input() featuredImageSize = 'large';

  parallaxConfig = {parallaxInitVal: -100, parallaxRatio: .7}

  constructor(private  el:ElementRef) {

  }

  getOffsetTop() {
    return (window.innerHeight - this.el.nativeElement.offsetTop) + 'px';
  }
}
