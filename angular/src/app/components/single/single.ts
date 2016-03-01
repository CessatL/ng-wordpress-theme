import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {PostCmp} from '../../shared/post/post';

@Component({
    selector: 'single',
    styles: [require('./single.scss')],
    template: require('./single.html'),
    directives: [PostCmp]
})
export class SingleCmp {
    slug;
    type;
    constructor(private _params: RouteParams) {
        this.slug = _params.get('slug');
        this.type = _params.get('type');
    }
}
