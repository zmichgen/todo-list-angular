import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  param = ['name'];
  value: Todo;
  ascend = true;
  priority = false;
  constructor(public db: AngularFirestore) { }

  getTodo(todoKey) {
    return this.db.collection('todoList').doc(todoKey).snapshotChanges();
  }

  updateTodo(todoKey, value: Todo) {
    return this.db.collection('todoList').doc(todoKey).set(value);
  }

  deleteTodo(todoKey) {
    return this.db.collection('todoList').doc(todoKey).delete();
  }

  getTodoList() {
    return this.db.collection('todoList').snapshotChanges();
  }

  createTodo(value: Todo) {
    return this.db.collection('todoList').add({
      name: value.name,
      description: value.description,
      dateTime: value.dateTime,
      priority: value.priority,
      isDone: value.isDone,
      color: value.color
    });
  }

  setParam(param: string[]) {
    this.param = param;
  }
}
