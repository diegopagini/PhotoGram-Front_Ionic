import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post, Posts } from '../interfaces/interfaces';
import { UserService } from './user.service';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  public newPost: EventEmitter<Post> = new EventEmitter<Post>();
  private postPage = 0;

  constructor(private http: HttpClient, private userService: UserService) {}

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
}
