import {Component} from 'angular2/core';

@Component({
  selector: 'search',
  template: `
      
        <form>
          <md-input-container class="md-block">
            <label for="searchInput">Search</label>
            <input type="text" (keyup.enter)="searchFor(input.value)" md-input #input md-autofocus>
          </md-input-container>  
        </form>
        <md-content>
          <div class="md-scroll-mask-bar">
            <posts [args]="searchArgs"></posts>
          </div>
        </md-content>
  `,
  styles: [`
    md-content{
      display: -webkit-flex;
    -webkit-flex-direction: column;
    height: 100%;
     }
      .md-scroll-mask-bar{
      -webkit-flex: 1 1 auto;
      overflow-y: auto;
    }
  `]
})
export class SearchCmp {

  searchArgs;
  constructor(){
  }

  searchFor(key){
    if(key == "") return;
    this.searchArgs = {
      _embed: true,
      perPage: 4,
      search: key
    }
  }
}

