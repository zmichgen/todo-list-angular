import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() todoData: any;
  @Input() id: any;
  isDone: boolean;

  constructor(private fbService: FirebaseService, public router: Router) { }

  ngOnInit() {
    this.isDone = this.todoData.isDone;
  }

  delTodo($event) {
    this.fbService.deleteTodo(this.id)
      .then(resolve => {
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleTodo($event) {
    this.todoData.isDone = !this.isDone;
    this.todoData.dateTime = new Date().toISOString();
    this.fbService.updateTodo(this.id, this.todoData)
      .then(resolve => {
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  editTodo() {
    this.router.navigate(['edit/' + this.id]);
  }

}
