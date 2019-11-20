import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export class HighlightPipeConfig {
  caseSensitive = false;
  highlightClass = 'highlighted-text';
}

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer) { }

  transform(value: string, searchString: string, config = new HighlightPipeConfig()): SafeHtml {
    if (!searchString || !value) {
      return value;
    }
    const {caseSensitive, highlightClass} = config;
    const compareValue = caseSensitive ?  value : value.toUpperCase();
    searchString = caseSensitive ? searchString : searchString.toUpperCase();
    const index = compareValue.indexOf(searchString);
    if (index === -1) {
      return value;
    }
    const left = value.slice(0, index);
    const match = value.slice(index, index + searchString.length);
    const right = value.slice(index + searchString.length);
    const rawHTML = `${left}<span class="${highlightClass}">${match}</span>${right}`;
    return this._domSanitizer.bypassSecurityTrustHtml(rawHTML);
  }

}
