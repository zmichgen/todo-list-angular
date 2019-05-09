import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Todo } from '../models/todo.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

import * as _ from 'lodash';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  todos: Todo[] = [];
  complete: Todo[] = [];



  constructor(
    public fbService: FirebaseService,
    public router: Router

  ) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.fbService.getTodoList()
      .subscribe(items => {
        this.items = items;
        const complete = [];
        const todos = [];
        this.items.forEach(item => {
          const todo: Todo = item.payload.doc.data();
          const id = item.payload.doc.id;
          todo.id = id;
          if (todo.isDone) {
            complete.push(todo);
          } else {
            todos.push(todo);
          }
        });
        this.todos = _.sortBy(todos, this.fbService.param);
        this.complete = complete;
        if (!this.fbService.ascend) {
          this.todos = _.reverse(this.todos);
        }

      });
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.toggleTodo(event.container.data[event.currentIndex]);

    }
  }

  toggleTodo(todo: Todo) {
    todo.isDone = !todo.isDone;
    todo.dateTime = new Date().toISOString();
    this.fbService.updateTodo(todo.id, todo)
      .then(resolve => {
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.log(error);
      });
  }

}
