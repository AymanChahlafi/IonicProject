/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   email: string = "";
   password: string = "";

  constructor(private auth: AngularFireAuth,
    private router: Router,
    private userId: DataService
    ) { }

  ngOnInit() {
  }

  async login() {
    const {email, password} = this;
    try {
      const res = await this.auth.signInWithEmailAndPassword(email, password).then(res => {
        this.userId.user = res.user.uid;
        this.userId.admin = res.user.email.split("@")[1] === 'admin.com' ? true :false;
        this.router.navigate(['/home']);
      });
    } catch (error) {
      console.log(error);
    }
  }

}
