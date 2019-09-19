import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform, NavController, LoadingController, IonInfiniteScroll } from '@ionic/angular';
import { AddTODOModal } from '../modals/add-todo/add-todo.component';
import { TodoCRUTService } from 'src/app/services/todo-crat.service';
import { NavDetailComponent } from 'src/app/components/nav-detail/nav-detail.component';
import { User } from 'src/app/models/userModels';
import { Storage } from '@ionic/storage';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListPage implements OnInit {

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;

  todoList: any[];
  currentUser: User;
  constructor(
    public modalController: ModalController,
    public todoService: TodoCRUTService,
    public authService: AuthService,
    private store: Storage,
    public loadingController: LoadingController,
    private router: Router
  ) { }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.todoList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }


  async addTODO() {
    const modal = await this.modalController.create({
      component: AddTODOModal
    });
    return await modal.present(), await modal.onWillDismiss().then((data => this.todoList.push(data.data.data)
    ));
  }

  showDetail(title) {
    let nav = document.querySelector('ion-nav');
    const todo = this.todoList.find(to => to.title === title);
    nav.push(NavDetailComponent, { todo });
  }

  logout() {
    console.log('logout');
    this.authService.logout()
    this.router.navigate(['home'])

  }

  async doRefresh(event) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.todoService.getTodoS(`content/${this.currentUser._id}`).subscribe(
      (todos: any[]) => {
        this.todoList = todos;
        event.target.complete();
        loading.dismiss();
      }
    )


  }
  ngOnInit() {
    this.store.get('token').then(
      async (token: string) => {
        if (!token) {
          this.router.navigate(['home'])
          return
        }
        const loading = await this.loadingController.create({
          message: 'Loading'
        });
        await loading.present();
        this.currentUser = jwt_decode(token);
        this.todoService.getTodoS(`content/${this.currentUser._id}`).subscribe(
          (todos: any[]) => {
            this.todoList = todos;
            loading.dismiss();
          }
        )
      }
    )
  }
}
