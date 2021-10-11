import { Component, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post = {};
  public slideOnlyOptions: SwiperOptions = {
    allowSlideNext: false,
    allowSlidePrev: false,
  };
  public likeIcon = 'heart-outline';
  private liked = false;

  public like(): void {
    this.liked = !this.liked;
    if (this.liked) {
      this.likeIcon = 'heart';
    } else {
      this.likeIcon = 'heart-outline';
    }
  }
}
