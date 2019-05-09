import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnInit {


  constructor(public router: Router, public fbService: FirebaseService) { }

  ngOnInit() {
  }

  addTodo() {
    this.router.navigate(['create']);
  }

  refreshPage() {
    this.router.navigateByUrl('create', { skipLocationChange: true }).then(() =>
      this.router.navigate(['home']));
  }

  sortByDate() {
    this.fbService.setParam(['dateTime', 'name']);
    this.fbService.ascend = !this.fbService.ascend;
    this.fbService.priority = false;
    this.refreshPage();
  }

  sortByPriority() {
    this.fbService.ascend = true;
    this.fbService.setParam(['priority', 'name']);
    this.fbService.priority = true;
    this.refreshPage();
  }

  sortByName() {
    this.fbService.ascend = true;
    this.fbService.setParam(['name']);
    this.fbService.priority = false;
    this.refreshPage();
  }

}
