import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageRate'
})
export class MessageRatePipe implements PipeTransform {

  transform(value: number, arg1: any, arg2: string): string {
    let retval = value
    let unit = arg2;
    if(retval == 0 || arg1 == null) {
      return `0 ${unit}`;
    }
    let timeArray = arg1.match(/(\d+)/)

    switch (timeArray.length) {
      case 1:
        retval = retval / timeArray[0];
        break;
      case 2:
        retval = retval / (timeArray[1]*60 + timeArray[0]);
        break;
      case 3:
        retval = retval / (timeArray[2]*60*60 + timeArray[1]*60 + timeArray[0]);
        break;
      default:
        break;
    }
    return `${retval.toFixed(2)} ${unit}`;
  }

}
