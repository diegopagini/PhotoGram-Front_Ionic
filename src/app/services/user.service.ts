import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interfaces';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public token: string = null;
  public user: User = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navController: NavController
  ) {
    this.createStorage();
  }

  public login(email: string, password: string): Promise<boolean> {
    const data = { email, password };
    return new Promise((resolve, reject) => {
      this.http
        .post(`${URL}/user/login`, data)
        .pipe(take(1))
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.saveToken(resp.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  public register(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${URL}/user/create`, user)
        .pipe(take(1))
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.saveToken(resp.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  public async validateToken(): Promise<boolean> {
    // Cargar el token
    await this.loadToken();
    // Si no existe resolver la promesa con un false
    if (!this.token) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }
    // Si existe que se haga la validacion normal
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'x-token': this.token,
      });

      this.http
        .get(`${URL}/user/`, { headers })
        .pipe(take(1))
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.user = resp.user;
            resolve(true);
          } else {
            this.navController.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }

  public getUser(): User {
    // eslint-disable-next-line no-underscore-dangle
    if (!this.user._id) {
      this.validateToken();
    }
    return { ...this.user };
  }

  private async loadToken() {
    this.token = (await this.storage.get('token')) || null;
  }

  private async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  private async createStorage() {
    await this.storage.create();
  }
}
