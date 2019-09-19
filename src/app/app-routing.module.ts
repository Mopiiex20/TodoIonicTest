import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  AuthGuard as AuthGuard
} from './core/guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomePageModule),
    // canActivate: [AuthGuard]

  },
  { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterPageModule) },
  {
    path: 'todolist',
    loadChildren: () => import('./components/todo-list/todo-list.module').then(m => m.TodoListModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
