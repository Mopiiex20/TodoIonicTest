import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TodoCRUTService } from 'src/app/services/todo-crat.service';
import * as jwt_decode from "jwt-decode";
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/userModels';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTODOModal implements OnInit {

  public addTODOForm: FormGroup;
  private user: User;

  constructor(
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public todoService: TodoCRUTService,
    private store: Storage,
    private userService: UserService

  ) {
    this.addTODOForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  addTodo() {
    const body = this.addTODOForm.value;
    body._id = null;
    body.userid = this.user._id;
    body.status = false;
    this.todoService.postTodo('content', body).subscribe((res: any) => console.log(res)
    )
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      data: this.addTODOForm.value,
      'dismissed': true
    });
  }
  ngOnInit() {
    this.store.get('token').then(
      (token: string) => {
        this.user = jwt_decode(token);
      }
    )
  }

}
