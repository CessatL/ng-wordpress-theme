import {Component} from 'angular2/core';
import {WPModels, WPEndpoint} from '../../wp';
import {AppState} from '../../app.service.ts';
import {Http} from "angular2/http";

@Component({
  selector: 'home',
  template: `
  <div class="page-content container">
    <dynamic [content]="pageContent()"></dynamic>
  </div> 
  `
})
export class HomeCmp {
  //use get home page id to load it from static front page.
  page;
  wp: WPModels;
  constructor(http: Http, private appState: AppState) {
    this.wp = new WPModels(http, WPEndpoint.Pages, appState)
  }
  ngOnInit() {
    var pageId = this.appState.get('config').home_id;
    this.appState.set('loadState', true);

    this.wp.fetch(pageId).subscribe(
      res => {
        this.page = res;
        this.appState.set('loadState', false);
      },
      err => console.log(err)
    );
  }
  pageContent() {
    if(this.page)
      return this.page.content.rendered;
  }
}
