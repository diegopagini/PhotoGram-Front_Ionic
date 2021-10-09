import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('mainSlide', { static: true }) slides: IonSlides;
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public avatarSlideOptions: SwiperOptions = {
    slidesPerView: 3.5,
  };
  public avatars: any[] = [
    {
      img: 'av-1.png',
      selected: true,
    },
    {
      img: 'av-2.png',
      selected: false,
    },
    {
      img: 'av-3.png',
      selected: false,
    },
    {
      img: 'av-4.png',
      selected: false,
    },
    {
      img: 'av-5.png',
      selected: false,
    },
    {
      img: 'av-6.png',
      selected: false,
    },
    {
      img: 'av-7.png',
      selected: false,
    },
    {
      img: 'av-8.png',
      selected: false,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private nav: NavController,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    // Bloquear slides
    this.slides.lockSwipes(true);

    // Crear loginForm
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Crear registerForm
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public async login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    if (this.loginForm.valid) {
      // Al devolver una promsea utilizando async si se llama al await se trabaja con la respuesta de esa promesa
      const valid = await this.userService.login(email, password);
      if (valid) {
        // navegar
        this.nav.navigateRoot('/main/tabs/home', { animated: true });
      } else {
        // mostrat alerta usuario y/o contraseña incorrecto
        this.uiService.informationalAlert(
          'Usuario y/o contraseña incorrectos.'
        );
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  public selectAvatar(avatar: any): void {
    this.avatars.forEach((el: any) => (el.selected = false));
    avatar.selected = true;
  }

  public async register() {
    if (this.registerForm.valid) {
      const valid = await this.userService.register(this.registerForm.value);
      if (valid) {
        this.nav.navigateRoot('/main/tabs/home', { animated: true });
      } else {
        this.uiService.informationalAlert('Ese correo electrónico ya existe.');
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  public moveToSwipe(index: number): void {
    this.slides.lockSwipes(false);
    this.slides.slideTo(index);
    this.slides.lockSwipes(true);
  }
}
