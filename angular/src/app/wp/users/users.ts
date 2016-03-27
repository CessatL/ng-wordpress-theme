import {Component} from 'angular2/core';
import { RouterLink} from 'angular2/router';
import {WPCollections,WPEnpoint} from '../wpservice/wp';


@Component({
  selector: 'users',
  template: `
    <ul class="users-list-item mdl-list">
      <li *ngFor="#user of users" class="mdl-list__item">
        <a [routerLink]="['User', { slug: user.slug }]" class="mdl-list__item-primary-content">
          {{user.name}}
        </a>
      </li>
    </ul>
    <loader [active]="loadingState"></loader>
    <div class="loadmore">
    
      <p>Showing {{wp.currentPage}} / {{wp.totalPages}} | Total Posts: {{wp.totalObjects}}</p>
    
    <button md-raised-button class="md-raised md-primary" (click)="more()"
        *ngIf="wp.hasMore() && !loadingState"
      >Load More</button>
    </div>
  `,
  directives: [RouterLink]
})

export class UsersCmp {
  users;
  loadingState = false;
  constructor(private wp: WPCollections) {
  }
  ngOnInit(){
    this.loadingState = true;
    this.wp.fetch(WPEnpoint.Users).subscribe(
      res=>{
        this.users = res;
        this.loadingState = false;
      },
      err=> console.log(err)
    );
  }
  loadMore() {
    this.loadingState = true;
    this.wp.more().subscribe(
      res=>{
        this.users = this.users.concat(res);
        this.loadingState = false;
      },
      err=> console.log(err)
    );
  }
}
