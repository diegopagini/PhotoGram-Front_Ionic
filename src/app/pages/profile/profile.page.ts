import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public updateForm: FormGroup;
  public user: User = {};

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      avatar: [''],
    });

    this.getAndUpdateUser();
  }

  public logout() {}

  public avatarSelected(event) {
    this.updateForm.get('avatar').setValue(event);
    this.user.avatar = event;
  }

  public async updateUser() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
    } else {
      this.user = this.updateForm.value;
      const updated = await this.userService.updateUser(this.user);

      if (updated) {
        this.uiService.presentToast('Usuario actualizado');
      } else {
        this.uiService.presentToast('No se pudo actualizar');
      }
    }
  }

  private getAndUpdateUser(): void {
    this.user = this.userService.getUser();
    this.updateForm.get('email').setValue(this.user.email);
    this.updateForm.get('name').setValue(this.user.name);
    this.updateForm.get('avatar').setValue(this.user.avatar);
  }
}
