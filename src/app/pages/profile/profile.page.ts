import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public updateForm: FormGroup;
  public user: User;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
    });

    this.getAndUpdateUser();
  }

  public logout() {}

  public avatarSelected(event) {
    console.log(event);
  }

  private getAndUpdateUser(): void {
    this.user = this.userService.getUser();
    this.updateForm.get('name').setValue(this.user.name);
    this.updateForm.get('email').setValue(this.user.email);
  }
}
