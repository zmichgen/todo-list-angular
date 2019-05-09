import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo;
  @Input() index;
  data: Todo;
  id: any;
  priority: any;
  priorityString = ['High', 'Medium', 'Low'];

  constructor(public fbServise: FirebaseService) { }

  ngOnInit() {
    this.data = this.todo;
    this.id = this.todo.id;
    this.priority = this.todo.priority;
  }

}
