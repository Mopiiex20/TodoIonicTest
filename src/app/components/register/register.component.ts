import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup

  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      passwordCheck: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  register() {
    console.log(this.registerForm.value);

  }
  ngOnInit() {
    try {
      console.log('sadadaasd');


    }
    catch (error) {
      console.log(error);

    }
  }

}