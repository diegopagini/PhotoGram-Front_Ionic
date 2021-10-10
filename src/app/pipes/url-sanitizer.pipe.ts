import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'urlSanitizer',
})
export class UrlSanitizerPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(image: string): any {
    return this.domSanitizer.bypassSecurityTrustUrl(image);
  }
}
