import { Component } from 'angular2/core';

@Component({
  selector: 'loader',
  template: `
    <div *ngIf="active" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
  `,
  styles: [require('./loader.css')]
})

export class LoaderCmp {
  active: boolean = false;
  constructor() {
  }
}
