import {Component} from 'angular2/core';
import {AppState} from "../../app.service";


@Component({ 
  selector: 'categories',
  template: `
    <md-content layout-padding>
      <md-list>
        <md-subheader class="md-no-sticky">{{categories?.length}} categories</md-subheader>
        <md-list-item class="md-1-line" *ngFor="#cat of categories">
          <div class="md-list-item-text" layout="column">
            <a [routerLink]="[ '/Blog', 'CatPosts', { slug: cat.slug } ]">{{ cat.name }}</a>
          </div>  
        </md-list-item>
      </md-list> 
    </md-content>
  `,
})
export class CategoriesCmp {

  categories;
  constructor(private appState:AppState) {
  }

  ngOnInit() {
    this.categories = this.appState.get('config').categories;
  }
}

