import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Posts } from '../interfaces/interfaces';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postPage = 0;

  constructor(private http: HttpClient) {}

  public getPosts(pull: boolean = false): Observable<Posts> {
    if (pull) {
      this.postPage = 0;
    }
    this.postPage++;
    return this.http.get<Posts>(`${URL}/posts/?page=${this.postPage}`);
  }
}
