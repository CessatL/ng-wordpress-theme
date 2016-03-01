import {Pipe} from 'angular2/core';

@Pipe({
    name: 'DatePipe'
})
export class DatePipe {
    transform(value: string, args: string[]): any {
        if (value) {
            var date = new Date(value);
            var monthNames = [
                'January', 'February', 'March',
                'April', 'May', 'June', 'July',
                'August', 'September', 'October',
                'November', 'December'
            ];
            if (args[0] === 'medium') {
                var result = date.getDate() + ' ' +
                 monthNames[date.getMonth()] + ', ' + date.getFullYear();
                 return result;
            }
            var result = date.getDate() + ' ' + date.getMonth() + ' ' + date.getFullYear();
            return result;
        } else {
            console.log('DatePipe: input value is undefined');
            return 'date is unknown';
        }
    }
}
