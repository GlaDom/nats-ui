import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteUnit'
})
export class ByteUnitPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let retval: number = value;
    let unit: string = " B";
    if(value > 1000000000) {
       retval = value / 1000;
       unit = " GB";
    } else if(value > 1000000) {
      retval = value / 1000/ 1000;
      unit = " MB";
    } else if(value > 1000) {
      retval = value / 1000;
      unit = " KB";
    }
    return `${retval.toFixed(2)} ${unit}`;
  }
}
