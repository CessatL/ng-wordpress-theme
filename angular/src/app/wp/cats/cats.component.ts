import {Component} from 'angular2/core';
import {WPCollections, WPEndpoint} from '../service/wp.service';
import {Http} from "angular2/http";
import {AppState} from "../../app.service";

@Component({
  selector: 'cats',
  template: require('./cats.html')
})
export class CatsCmp {

  categories;
  loadingState = false;
  queryArgs;
  wp:WPCollections;

  constructor(http:Http, appState:AppState) {
    this.wp = new WPCollections(http, WPEndpoint.Categories, appState);
  }

  ngOnInit() {
    this.queryArgs = {
      filter: {
        orderby: 'title',
        order: 'ASC'
      }
    }
    this.loadingState = true;
    this.wp.fetch(this.queryArgs).subscribe(
      res=> {
        this.categories = res;
        this.loadingState = false;
      },
      err=>console.log(err)
    );
  }

  more() {
    this.loadingState = true;
    this.wp.more().subscribe(
      res=> {
        this.categories = this.categories.concat(res);
        this.loadingState = false;
      },
      err=>console.log(err)
    );
  }
}

