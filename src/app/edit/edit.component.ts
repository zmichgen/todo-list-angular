import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  item: any;
  constructor(
    public fbService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.editForm = this.fb.group({
      name: new FormControl(this.item.name),
      description: new FormControl(this.item.description),
      isDone: new FormControl(this.item.isDone),
      priority: new FormControl(this.item.priority),
      dateTime: new FormControl(this.item.dateTime),
      color: new FormControl(this.item.color)
    });
  }

  onSubmit(value) {
    this.fbService.updateTodo(this.item.id, value)
      .then(
        res => {
          this.router.navigate(['home']);
        }
      )
  }

  cancel() {
    this.router.navigate(['home']);
  }

}
