import {Component} from 'angular2/core';
import {AppState} from "../../app.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';


@Component({
  selector: 'categories',
  template: `
    <md-content>
      <md-list>
        <!--<md-subheader class="md-no-sticky">{{categories?.length}} categories</md-subheader>-->
        <md-list-item class="md-3-line" *ngFor="#cat of categories">
          <div class="md-list-item-text" layout="column">
            <h3>{{ cat.name }}</h3>
            <p>{{ cat.description }}</p>
          </div>
        </md-list-item>
      </md-list> 
    </md-content>
  `
})
export class CategoriesCmp {

  categories;

  constructor(private appState:AppState) {

  }

  ngOnInit() {
    let cats = this.appState.get('config').categories;
    let y = Observable.of(cats);
    y.map(res => {
      console.log(res);
      this.categories = res;
    }).subscribe();
  }
}

