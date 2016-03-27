import {Component} from 'angular2/core';
import {DynamicCmp} from "../../shared/dynamic/dynamic";
import { WPModels, WPEnpoint } from '../../wp/wpservice/wp';

@Component({
  selector: 'home', 
  directives: [DynamicCmp],
  template: `
  <loader [active]="loadingState"></loader>
  <div class="page-content container">
    <dynamic [dynamic]="pageContent()"></dynamic>
  </div>
  `
})
export class HomeCmp {
  //use get home page id to load it from static front page.
  page;
  loadingState = false;
  constructor(private wp: WPModels) {}
  ngOnInit() {
    var pageId = window['app_config'].home_id;
    this.loadingState = true;

    this.wp.fetch(WPEnpoint.Pages, pageId).subscribe((model)=> {
      this.page = model;
      this.loadingState = false;
    });
  }
  pageContent() {
    if(this.page)
      return this.page.content.rendered;
  }
}


//import {ModelService, ModelType} from "../../wp/wpservice/wpservice";
//ModelService
// this.wp.fetch(pageId, ModelType.Page).done((model)=> {
//   this.page = model;
//   this.loadingState = false;
// });
