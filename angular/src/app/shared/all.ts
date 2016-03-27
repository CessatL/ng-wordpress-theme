import {CONST_EXPR, Type} from 'angular2/src/facade/lang';

import {LoaderCmp} from './loader/loader';
export * from './loader/loader';


/**
 * Collection of wordpress component directives.
 */
export const SHARED_DIRECTIVES: Type[] = CONST_EXPR([

  LoaderCmp
]);

/**
 * Collection of wordpress services providers.
 */
// export const SHARED_PROVIDERS: any[] = [
//   LoaderCmp
// ];
