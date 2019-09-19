import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public storage: Storage,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  login() {
    this.authService.auth('login', this.loginForm.value).subscribe((res) => {
      console.log(res.token);
      this.storage.set('token', res.token)
    })
  }

  ngOnInit() {
    let token: string;
    this.storage.get('token')
      .then(
        (data) => {
          token = data; if (token) {
            this.router.navigate(['todolist'])

          }
        }
      )


  }
}
