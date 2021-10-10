import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare const window: any;
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
    private geolocation: Geolocation,
    private camera: Camera
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

  public useCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const img = window.Ionic.WebView.converFileSrc(imageData);
        console.log(img);
        this.tempImages.push(img);
      },
      (err) => {
        // Handle error
      }
    );
  }
}
