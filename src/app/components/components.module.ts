import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [PostsComponent, PostComponent],
  imports: [CommonModule, IonicModule],
  exports: [PostsComponent, PostComponent],
})
export class ComponentsModule {}
