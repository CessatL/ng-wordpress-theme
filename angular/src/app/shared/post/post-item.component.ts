import {Input, Component} from 'angular2/core';


@Component({
  selector: 'post-item',
  template: `
    <md-list-item [class]="(config?.showExcerpt) ? 'md-3-line' : 'md-1-line'">
      <img class="md-avatar" [src]="post.featuredImage(featuredImageSize)">
      <div class="md-list-item-text" layout="column">
        <a [routerLink]="['/Post', { slug: post.slug() } ]">
          {{post.title()}}
        </a>
        <p *ngIf="config?.showExcerpt" [innerHtml]="post.excerpt()"></p>
      </div>
    </md-list-item>
  `,
  styles: [`
  `]
})
export class PostItemCmp {
  @Input() post;
  @Input() featuredImageSize = 'small';
  @Input() config;

  constructor() {

  }

}
