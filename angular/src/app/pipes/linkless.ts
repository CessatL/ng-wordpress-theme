import {Pipe} from 'angular2/core';

@Pipe({
    name: 'LinklessPipe'
})
export class LinklessPipe {
    transform(value: string, args: string[]): any {
        if (value) {
            return value.replace(/<a\b[^>]*>(.*?)<\/a>/i,"")
        } else {
            console.log('LinklessPipe: input value is undefined');
            return "there is no excerpt for this post.";
        }
    }
}
