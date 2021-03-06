import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public disabled = false;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.nextPosts();
    this.postsService.newPost
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((post: Post) => {
        this.posts.unshift(post);
      });
  }

  public reload(event) {
    this.nextPosts(event, true);
    this.disabled = false;
    this.posts = [];
  }

  public nextPosts(event?: any, pull: boolean = false) {
    this.postsService
      .getPosts(pull)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.posts.push(...data.posts);
        // Infinite Scroll
        if (event) {
          event.target.complete();
          // Completar el Infinite Scroll
          if (data.posts.length === 0) {
            this.disabled = true;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
