import { Component } from 'angular2/core';
import { CollectionService, CollectionType } from '../../../assets/service-worker';

@Component({
  selector: 'tags',
  viewProviders: [CollectionService],
  template: `
    <div class="tags">
      <span class="tag-item" *ngFor="#tag of wp.results">
        {{tag.name}}
      </span>
    </div>
  `
})

export class TagsCmp {

  constructor(private wp: CollectionService) {
  }
  ngOnInit(){
    this.wp.Initialize(CollectionType.Tags);
    this.wp.fetch();
  }
}
