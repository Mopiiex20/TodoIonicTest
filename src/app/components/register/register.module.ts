import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterPage
      }
    ])
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule { }
