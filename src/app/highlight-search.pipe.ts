import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { removeHtml } from '../Utils/util-functions';

 function removeHtml(content: string) {
  return content && content.replace(/<(?!br\s*\/?)[^>]+>/g, '').replace(/<br>/g, '\n').replace(/&nbsp;/g, '')
}

@Pipe({
  name: 'highlightSearch',
})
export class HighlightSearchPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: any, args: any, highlightClass: string = 'highlight-search-text', isFindAll: boolean = false): any {

    if (isFindAll) {
      if (!args) {
        return value;
      }
      // Match in a case insensitive manner
      const re = new RegExp(args, 'gi');
      const match = value.match(re);

      if (!match) {
        return value;
      }

      const replacedValue = value.replace(re, `<span class=${highlightClass}>${match[0]}</span>`); // value.replace(re, "<mark>" + match[0] + "</mark>")
      return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
    }

    else {
      if (args && value) {
        value = String(removeHtml(value)); // make sure its a string
        let startIndex = value.toLowerCase().indexOf(args.toLowerCase());
        if (startIndex != -1) {
          let endLength = args.length;
          let matchingString = value.substr(startIndex, endLength);
          return value.replace(matchingString, `<span class=${highlightClass}> ${matchingString}</span>`);
        }
      }
      return value;
    }
  }
}
