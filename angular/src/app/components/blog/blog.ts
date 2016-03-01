import { Component } from 'angular2/core';
import { PostsCmp } from '../../shared/posts/posts';

@Component({
	selector: 'blog',
	template: require('./blog.html'),
  directives: [PostsCmp]
})
export class BlogCmp {}
