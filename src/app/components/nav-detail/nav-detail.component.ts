import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TodoListPage } from '../todo-list/todo-list.component';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { TODO } from 'src/app/models/contentModels';
import { TodoCRUTService } from 'src/app/services/todo-crat.service';

@Component({
  selector: 'app-nav-detail',
  templateUrl: './nav-detail.component.html',
  styleUrls: ['./nav-detail.component.scss'],
})
export class NavDetailComponent implements OnInit {

  todoEditForm: FormGroup;
  currentTodo: TODO;
  todoCheck: boolean;
  todo: any;


  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private contentServise: TodoCRUTService
  ) {
    this.todoEditForm = this.formBuilder.group({
      title: new FormControl(''),
      description: new FormControl('')
    });


  }
  accept(todo_id) {
    const body = {
      title: this.todoEditForm.get('title').value,
      description: this.todoEditForm.get('description').value,
      status: this.todoCheck
    }
    this.contentServise.putTodo(`${todo_id}`, body).subscribe(res => { })
    let nav = document.querySelector('ion-nav');
    nav.push(TodoListPage);
  }

  back() {
    let nav = document.querySelector('ion-nav');
    nav.push(TodoListPage);
  }

  change(event) {
    console.log(event.detail.checked);
    this.todoCheck = event.detail.checked;
  }

  async deleteTodo(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirm deleting',
      message: 'Are you sure you want to delete this TODO ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.contentServise.deleteTODO(id).subscribe(data => { }
            );
            let nav = document.querySelector('ion-nav');
            nav.push(TodoListPage)
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
    this.todoCheck = this.todo.status;
    this.todoEditForm.patchValue({
      title: this.todo.title,
      description: this.todo.description
    })


  }

}
