import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public token: string = null;

  constructor(private http: HttpClient, private storage: Storage) {
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

  private async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  private async createStorage() {
    await this.storage.create();
  }
}
