import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { UrlSanitizerPipe } from './url-sanitizer.pipe';
import { ImagePipe } from './image.pipe';

@NgModule({
  declarations: [DomSanitizerPipe, UrlSanitizerPipe, ImagePipe],
  exports: [DomSanitizerPipe, UrlSanitizerPipe, ImagePipe],
})
export class PipesModule {}
