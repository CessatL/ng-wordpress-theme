import {CONST_EXPR, Type} from 'angular2/src/facade/lang';

import {SearchCmp} from '../wp/search/search';
export * from '../wp/search/search';

import {PostsCmp} from '../wp/posts/posts';
import {PostCmp} from '../wp/post/post';
export * from '../wp/posts/posts';
export * from '../wp/post/post';

import {CatsCmp} from '../wp/cats/cats';
import {CatCmp} from '../wp/cats/cat';
export * from '../wp/cats/cat';
export * from '../wp/cats/cats';

import {CategoriesCmp} from './categories/categories';
export * from './categories/categories';

import {TagsCmp} from '../wp/tags/tags';
export * from '../wp/tags/tags';

import {UserCmp} from '../wp/users/user';
import {UsersCmp} from '../wp/users/users';
export * from '../wp/users/users';
export * from '../wp/users/user';


import {WPModels, WPCollections} from './wpservice/wp';
export * from './wpservice/wp';

/**
 * Collection of wordpress component directives.
 */
export const WORDPRESS_DIRECTIVES:Type[] = CONST_EXPR([
  PostsCmp,
  PostCmp,
  CatsCmp,
  CatCmp,
  TagsCmp,
  UserCmp,
  UsersCmp,
  SearchCmp,
  CategoriesCmp
]);

/**
 * Collection of wordpress services providers.
 */
export const WORDPRESS_PROVIDERS:any[] = [
  WPModels,
  WPCollections
];
