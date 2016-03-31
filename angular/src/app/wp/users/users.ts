import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {WPCollections, WPEndpoint} from '../wpservice/wp';
import {Http} from "angular2/http";
import {AppState} from "../../app.service";

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
    <md-progress-circular class="md-accent md-hue-1" mode="indeterminate"
       [hidden]="!loadingState" [diameter]="60"></md-progress-circular>
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
  wp: WPCollections;
  constructor(http: Http, appState: AppState) {
    this.wp = new WPCollections(http, WPEndpoint.Users, appState)
  }
  ngOnInit(){
    this.loadingState = true;
    this.wp.fetch().subscribe(
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
