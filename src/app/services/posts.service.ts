import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post, Posts } from '../interfaces/interfaces';
import { UserService } from './user.service';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  public newPost: EventEmitter<Post> = new EventEmitter<Post>();
  public postPage = 0;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private fileTransfer: FileTransfer
  ) {}

  public getPosts(pull: boolean = false): Observable<Posts> {
    if (pull) {
      this.postPage = 0;
    }
    this.postPage++;
    return this.http.get<Posts>(`${URL}/posts/?page=${this.postPage}`);
  }

  public createPost(post: Post): Promise<boolean> {
    const headers = new HttpHeaders({
      'x-token': this.userService.token,
    });

    return new Promise((resolve, reject) => {
      this.http
        .post(`${URL}/posts/`, post, { headers })
        .pipe(take(1))
        .subscribe((resp: any) => {
          this.newPost.emit(resp.post);
          resolve(true);
        });
    });
  }

  public uploadImage(img: string): void {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.userService.token,
      },
    };
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer
      .upload(img, `${URL}/posts/upload`, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
}
