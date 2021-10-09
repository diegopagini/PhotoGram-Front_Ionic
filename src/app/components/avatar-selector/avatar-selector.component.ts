import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {
  @Output() avatarSelected: EventEmitter<string> = new EventEmitter<string>();
  @Input() currentAvatar = 'av-1.png';

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

  ngOnInit(): void {
    this.avatars.map((el) => (el.selected = false));
    this.avatars.map((el) => {
      if (el.img === this.currentAvatar) {
        el.selected = true;
      }
    });
  }

  public selectAvatar(avatar: any): void {
    this.avatars.forEach((el: any) => (el.selected = false));
    avatar.selected = true;
    this.avatarSelected.emit(avatar.img);
  }
}
