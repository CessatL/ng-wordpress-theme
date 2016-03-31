import {Component} from 'angular2/core';
import {WPCollections, WPEndpoint} from '../wpservice/wp';
import {Http} from "angular2/http";
import {AppState} from "../../app.service";

@Component({
  selector: 'tags',
  template: `
    <div class="tags">
      <span class="tag-item" *ngFor="#tag of tags">
        {{tag.name}}
      </span>
    </div>
  `
})

export class TagsCmp {
  wp:WPCollections
  tags;
  loadingState = false;

  constructor(http:Http, appState:AppState) {
    this.wp = new WPCollections(http, WPEndpoint.Tags, appState);
  }

  ngOnInit() {
    this.loadingState = true;
    this.wp.fetch().subscribe(
      res=> {
        this.tags = res;
        this.loadingState = false;
      },
      err=> console.log(err)
    );
  }
}
