import {CONST_EXPR, Type} from 'angular2/src/facade/lang';

import { PostsCmp } from './posts/posts';
import { PostCmp } from './post/post';
export * from './posts/posts';
export * from './post/post';

import { CatsCmp } from './cats/cats';
import { CatCmp } from './cats/cat';
export * from './cats/cat';
export * from './cats/cats';

import { TagsCmp } from './tags/tags';
export * from './tags/tags';

import { AuthorCmp } from './author/author';
import { AuthorsCmp } from './author/authors';
export * from './author/authors';
export * from './author/author';


import { SingleService, CollectionService } from './../../assets/service-worker';
export * from './../../assets/service-worker';

/**
 * Collection of wordpress component directives.
 */
export const WORDPRESS_DIRECTIVES: Type[] = CONST_EXPR([
  PostsCmp,
  PostCmp,
  CatsCmp,
  CatCmp,
  TagsCmp,
  AuthorCmp,
  AuthorsCmp
]);

/**
 * Collection of wordpress services providers.
 */
export const WORDPRESS_PROVIDERS: any[] = [
  SingleService,
  CollectionService
];
