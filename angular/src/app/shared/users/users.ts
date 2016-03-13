import {Component} from 'angular2/core';
import { RouterLink} from 'angular2/router';
import {CollectionService,CollectionType} from '../../../assets/service-worker';


@Component({
  selector: 'users',
  viewProviders: [CollectionService],
  template: `
    <ul class="users-list-item mdl-list">
      <li *ngFor="#user of wp.results" class="mdl-list__item">
        <a [routerLink]="['User', { slug: user.slug }]" class="mdl-list__item-primary-content">
          {{user.name}}
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

export class UsersCmp {

  constructor(private wp: CollectionService) {
  }
  ngOnInit(){
    this.wp.Initialize(CollectionType.Users);
    this.wp.fetch();
  }
  loadMore() {
    this.wp.more();
  }
}
