import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const URL = environment.baseUrl;

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(img: string, userId: string): string {
    return `${URL}/posts/imagen/${userId}/${img}`;
  }
}
