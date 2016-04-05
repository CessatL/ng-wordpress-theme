import {Component} from 'angular2/core';
import {AppState} from "../../app.service";

@Component({
  selector: 'loader',
  providers: [AppState],
  template: `
    <md-progress-linear [hidden]="!appState._state.loadState" mode="indeterminate"></md-progress-linear>
  `
})

export class LoaderCmp {
  constructor(private appState:AppState) {
  }
}
