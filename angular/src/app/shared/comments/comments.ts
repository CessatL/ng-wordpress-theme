import { Component, Input } from 'angular2/core';

@Component({
  selector: 'comments',
  template: `
    <div class="comments-list">
      <md-list>
        <md-list-item class="md-3-line" *ngFor="#comment of comments" >
          <img class="md-avatar" [src]="comment.author_avatar_urls['48']">
          <h4>{{comment.author_name}}</h4> Says:
          <div class="md-list-item-text" layout="column">
            <p [innerHtml]="comment.content.rendered"></p>
          </div>
          <p>posted on {{comment.date}}</p>
        </md-list-item>
      </md-list>
    </div>
  `
})

export class LoaderCmp {
  @Input() comments;
  constructor() {
  }

  ngOnInit(){

  }
}
