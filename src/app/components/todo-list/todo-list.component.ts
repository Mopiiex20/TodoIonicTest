import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AddTODOModal } from '../modals/add-todo/add-todo.component';
import { TodoCRUTService } from 'src/app/services/todo-crat.service';
import { ActivatedRoute } from '@angular/router';


export interface TODO {
  _id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListPage implements OnInit {



  todoList: any[];


  constructor( public modalController: ModalController, public todoService: TodoCRUTService) { }


  async addTODO() {
    const modal = await this.modalController.create({
      component: AddTODOModal
    });

    return await modal.present(), await modal.onWillDismiss().then((data => this.todoList.push(data.data.data)
    ));
  }

  ngOnInit() {
    
    this.todoService.getTodoS('content').subscribe(
      (todos: any[]) => {
        this.todoList = todos;
      }
    )
  }

}
