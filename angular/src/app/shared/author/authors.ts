import {Component} from 'angular2/core';
import { RouterLink} from 'angular2/router';
import {AuthorsService} from '../../../assets/service-worker';


@Component({
  selector: 'author',
  viewProviders: [AuthorsService],
  template: `
    <ul class="authors-list-item mdl-list">
      <li *ngFor="#author of wp.authors" class="mdl-list__item">
        <a [routerLink]="['Author', { slug: author.slug }]" class="mdl-list__item-primary-content">
          {{author.name}}
        </a>
      </li>
    </ul>
    <div class="loadmore">

      <p>Showing {{wp.service.state.currentPage}} / {{wp.service.state.totalPages}} | Total Posts: {{wp.service.state.totalObjects}}</p>

      <button (click)="loadMore()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
              [disabled]="wp.service.state.currentPage == wp.service.state.totalPages"
      >Load More</button>
    </div>
  `,
  directives: [RouterLink]
})

export class AuthorsCmp {

  constructor(private wp: AuthorsService) {;
  }
  ngOnInit(){
    this.wp.fetchAuthor();
  }
  loadMore(){
    this.wp.fetchMore();
  }
}
