import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';

@NgModule({
  declarations: [PostsComponent, PostComponent, AvatarSelectorComponent],
  imports: [CommonModule, IonicModule, PipesModule],
  exports: [PostsComponent, PostComponent, AvatarSelectorComponent],
})
export class ComponentsModule {}
