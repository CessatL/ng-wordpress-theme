import {Component, Input, DynamicComponentLoader, ElementRef} from 'angular2/core';

@Component({
  selector: 'dynamic',
  template: '<div #container></div>'
})
export class DynamicCmp {

  constructor(private loader:DynamicComponentLoader,
              private elementRef:ElementRef) {
  }

  @Input() set dynamic(content) {
    if (content) {
      this.renderTemplate(content)
    }
  }

  renderTemplate(template) {
    this.loader.loadIntoLocation(
      toComponent(template),
      this.elementRef,
      'container'
    )
  }
}

function toComponent(template) {
  @Component({
    selector: 'content',
    template: template,
  })
  class DynamicComponent {
  }

  return DynamicComponent;
}
