import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage {
  public tempImages: string[] = [];
  public post: Post = {
    message: '',
    coords: null,
    position: false,
  };
  public geoLocationLoading = false;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private geolocation: Geolocation
  ) {}

  public async createPost(): Promise<void> {
    const created = await this.postsService.createPost(this.post);

    this.post = {
      message: '',
      coords: null,
      position: false,
    };
    this.router.navigateByUrl('main/tabs/home');
  }

  public getGeolocation() {
    if (!this.post.position) {
      this.post.coords = null;
      return;
    }

    this.geoLocationLoading = true;
    this.geolocation
      .getCurrentPosition()
      .then((resp: Geoposition) => {
        this.geoLocationLoading = false;
        const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
        this.post.coords = coords;
      })
      .catch((err) => {
        console.log(err);
        this.geoLocationLoading = false;
      });
  }
}
