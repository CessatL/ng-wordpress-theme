import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {PostCmp} from '../../shared/post/post';
import {SingleService} from '../../../assets/service-worker';

@Component({
  selector: 'single',
  viewProviders: [SingleService],
 // styles: [require('./single.scss')],
  template: require('./single.html'),
  directives: [PostCmp]
})
export class SingleCmp {

  slug;
  type;
  constructor(private wp: SingleService, private _params: RouteParams) {
    this.slug = _params.get('slug');
    this.type = _params.get('type');
  }
  ngOnInit() {
    this.wp.getPost(this.slug);
  }
}
