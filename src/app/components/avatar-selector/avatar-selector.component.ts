import { Component, EventEmitter, Output } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent {
  @Output() avatarSelected: EventEmitter<string> = new EventEmitter<string>();

  public avatarSlideOptions: SwiperOptions = {
    slidesPerView: 3.5,
  };
  public avatars: any[] = [
    {
      img: 'av-1.png',
      selected: true,
    },
    {
      img: 'av-2.png',
      selected: false,
    },
    {
      img: 'av-3.png',
      selected: false,
    },
    {
      img: 'av-4.png',
      selected: false,
    },
    {
      img: 'av-5.png',
      selected: false,
    },
    {
      img: 'av-6.png',
      selected: false,
    },
    {
      img: 'av-7.png',
      selected: false,
    },
    {
      img: 'av-8.png',
      selected: false,
    },
  ];

  public selectAvatar(avatar: any): void {
    this.avatars.forEach((el: any) => (el.selected = false));
    avatar.selected = true;
    this.avatarSelected.emit(avatar.img);
  }
}
