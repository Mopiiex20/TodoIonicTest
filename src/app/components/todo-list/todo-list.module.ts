import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TodoListPage } from './todo-list.component';
import { AddTODOModal } from '../modals/add-todo/add-todo.component';
import { TodoCRUTService } from 'src/app/services/todo-crat.service';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';



@NgModule({
  declarations: [TodoListPage, AddTODOModal, TodoDetailsComponent],
  providers: [TodoCRUTService],
  entryComponents: [AddTODOModal],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TodoListPage
      },
      {
        path: ':todo',
        component: TodoDetailsComponent
      }
    ])
  ]
})
export class TodoListModule { }
