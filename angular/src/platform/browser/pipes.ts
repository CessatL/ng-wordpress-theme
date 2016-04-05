/*
 * These are globally available pipes in any template
 */

import {provide, PLATFORM_PIPES} from 'angular2/core';
import {DatePipe} from '../../app/pipes';

// application_pipes: pipes that are global through out the application
export const APPLICATION_PIPES = [
  DatePipe
];

export const PIPES = [
  provide(PLATFORM_PIPES, {useValue: APPLICATION_PIPES, multi: true})
];
