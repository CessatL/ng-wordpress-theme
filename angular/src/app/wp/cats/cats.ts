import { Component } from 'angular2/core';
import { WPCollections, WPEnpoint } from '../wpservice/wp';
import { RouterLink } from 'angular2/router';
import {Http} from "angular2/http";
import {AppState} from "../../app.service";

@Component({
  selector: 'categories',
  template: require('./cats.html'),
  directives: [RouterLink]
})
export class CatsCmp {

  categories;
  loadingState = false;
  queryArgs;
  wp: WPCollections;
  constructor(http: Http, appState: AppState) {
    this.wp = new WPCollections(http, WPEnpoint.Categories, appState);
  }
  ngOnInit(){
    this.queryArgs = {
      filter : {
        orderby: 'title',
        order: 'ASC'
      }
    }
    this.loadingState = true;
    this.wp.fetch(this.queryArgs).subscribe(
      res=>{
        this.categories = res;
        this.loadingState = false;
      },
      err=>console.log(err)
    );
  }
  loadMore() {
    this.loadingState = true;
    this.wp.more().subscribe(
      res=>{
        this.categories = this.categories.concat(res);
        this.loadingState = false;
      },
      err=>console.log(err)
    );
  }
}

