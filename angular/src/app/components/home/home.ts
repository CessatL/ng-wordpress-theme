import {Component} from 'angular2/core';

@Component({
  selector: 'home',
  template: `
  I'm home page
  `
})
export class HomeCmp {
  //use get home page id/slug to load it from static front page.
  constructor() {}
}
