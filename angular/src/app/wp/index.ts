import {CONST_EXPR, Type} from 'angular2/src/facade/lang';

import {SearchCmp} from '../wp/search';
export * from '../wp/search';

import {PostsCmp} from '../wp/posts';
export * from '../wp/posts';

import {CategoriesCmp} from './categories';
export * from './categories';

import {TagsCmp} from '../wp/tags';
export * from '../wp/tags';

import {UsersCmp} from '../wp/users';
export * from '../wp/users';

// Currently using CategoriesCmp instead of CatsCmp.
// import {CatsCmp} from '../wp/cats';
// export * from '../wp/cats';

import {WPModels, WPCollections} from './service';
export * from './service';

/**
 * Collection of wordpress component directives.
 */
export const WORDPRESS_DIRECTIVES:Type[] = CONST_EXPR([
  PostsCmp,
  TagsCmp,
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
