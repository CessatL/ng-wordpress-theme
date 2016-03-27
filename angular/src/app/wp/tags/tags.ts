import { Component } from 'angular2/core';
import { WPCollections, WPEnpoint } from '../wpservice/wp';

@Component({
  selector: 'tags',
  template: `
    <div class="tags">
      <span class="tag-item" *ngFor="#tag of tags">
        {{tag.name}}
      </span>
    </div>
  `
})

export class TagsCmp {
  tags;
  loadingState = false;
  constructor(private wp: WPCollections) {
  }
  ngOnInit(){
    this.loadingState = true;
    this.wp.fetch(WPEnpoint.Tags).subscribe(
      res=> {
        this.tags = res;
        this.loadingState = false;
      },
      err=> console.log(err)
    );
  }
}
