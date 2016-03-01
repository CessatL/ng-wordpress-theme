import { Component } from 'angular2/core';
import { PostsCmp } from '../../shared/posts/posts';

@Component({
	selector: 'projects',
    styles: [require('./projects.scss')],
	template: require('./projects.html'),
    directives: [PostsCmp]
})
export class ProjectsCmp {}

//Single Project Component
import {RouteParams} from 'angular2/router';
import {PostCmp} from '../../shared/post/post';

@Component({
    selector: 'single',
    styles: [require('../single/single.scss')],
    template: require('../single/single.html'),
    directives: [PostCmp]
})
export class SingleProjectCmp {
    slug;
    type;
    constructor(private _params: RouteParams) {
        this.slug = _params.get('slug');
        this.type = 'projects';
    }
}
