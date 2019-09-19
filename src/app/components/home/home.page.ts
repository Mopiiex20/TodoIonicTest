import { Component, OnInit, DoCheck } from '@angular/core';
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

  isLog: boolean = false;

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
      console.log(res);
      if (res.status === 200) {
        this.authService.completeSignIn(res.message)
      } else return

    })
  }

  ngOnInit() {
    console.log(this.authService.authState.value);
    if (this.isLog) {
      this.router.navigate(['todolist'])
    }
  }
}
