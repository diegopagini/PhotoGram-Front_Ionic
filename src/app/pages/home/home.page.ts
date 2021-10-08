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
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService
      .getPosts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.posts.push(...data.posts);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
