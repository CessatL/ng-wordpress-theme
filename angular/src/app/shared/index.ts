import {CONST_EXPR, Type} from 'angular2/src/facade/lang';

import {LoaderCmp} from './loader';
export * from './loader';

import {DynamicCmp} from './dynamic';

import {fillViewHeight} from './fill-height';
export * from './fill-height';

import {PostCmp, PostItemCmp} from  './post';
export * from './post';

import {HeaderCmp} from "./header";
export * from './header'

/**
 * Collection of wordpress component directives.
 */
export const SHARED_DIRECTIVES:Type[] = CONST_EXPR([
  HeaderCmp,
  DynamicCmp,
  PostCmp,
  PostItemCmp,
  LoaderCmp,
  fillViewHeight
]);

/**
 * Collection of wordpress services providers.
 */
 export const SHARED_PROVIDERS: any[] = [

 ];
