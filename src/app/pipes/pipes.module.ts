import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { UrlSanitizerPipe } from './url-sanitizer.pipe';

@NgModule({
  declarations: [DomSanitizerPipe, UrlSanitizerPipe],
  exports: [DomSanitizerPipe, UrlSanitizerPipe],
})
export class PipesModule {}
