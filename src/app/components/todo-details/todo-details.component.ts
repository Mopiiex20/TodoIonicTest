import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TodoCRUTService } from 'src/app/services/todo-crat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit {

  public TODOForm: FormGroup;

  todoData: object;

  constructor(
    public formBuilder: FormBuilder,
    public todoService: TodoCRUTService,
    private activatedRoute: ActivatedRoute
  ) {
    this.TODOForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  addTodo() {
    
  }
  ngOnInit() { 
    console.log(this.activatedRoute.snapshot.paramMap.get('todo'));
    
  }

}
