import {Component} from 'angular2/core';

@Component({
  selector: 'search',
  template: `
        <form (submit)="search(input.value)">
          <md-input-container class="md-block">
            <label for="searchInput">Search</label>
            <input type="text" #input md-input md-autofocus>
          </md-input-container>  
        </form>
        <md-content>
          <posts [args]="searchArgs"></posts>
        </md-content>
  `,
})
export class SearchCmp {

  searchArgs;

  constructor() {
  }

  search(key) {
    if (key == "") return;
    this.searchArgs = {
      _embed: true,
      perPage: 4,
      search: key
    }
  }
}

