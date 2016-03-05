import { Component } from 'angular2/core';
import { TagService } from '../../../assets/service-worker';

@Component({
  selector: 'category',
  viewProviders: [TagService],
  template: `
    <div class="tags">
      <span class="tag-item" *ngFor="#tag of wp.tags">
        {{tag.name}}
      </span>
    </div>
  `
})

export class TagsCmp {

  constructor(private wp: TagService) {
  }
  ngOnInit(){
    this.wp.fetchTags();
  }
}
