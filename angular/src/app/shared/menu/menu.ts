import { Component, ElementRef } from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { RouterActive } from './router-active';

@Component({
  selector: 'main-menu',
  template: require('./menu.html'),
  styles: [require('./menu.css')],
  directives: [RouterLink, RouterActive]
})

export class MenuCmp {
  constructor(elementRef: ElementRef) {
  }
  ngOnInit() {
  }
}
