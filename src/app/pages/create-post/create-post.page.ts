import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  };

  constructor(private postsService: PostsService, private router: Router) {}

  public async createPost(): Promise<void> {
    const created = await this.postsService.createPost(this.post);

    this.post = {
      message: '',
    };
    this.router.navigateByUrl('main/tabs/home');
  }
}
