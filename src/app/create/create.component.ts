import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  addForm: FormGroup;
  colors: string[] = [
    'green', 'blue', 'orange', 'rgb(110, 45, 45)',
    'rgb(41, 166, 175)', 'rgb(41, 166, 175)', 'rgb(95, 175, 41)'
  ];
  constructor(
    public fbService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addForm = this.fb.group({
      name: new FormControl(),
      description: new FormControl(),
      isDone: new FormControl(),
      priority: new FormControl(),
      dateTime: new FormControl(),
      color: new FormControl(),
    });
  }

  resetFields() {
    this.addForm = this.fb.group({
      name: new FormControl(),
      description: new FormControl(),
      isDone: new FormControl(),
      priority: new FormControl(),
      dateTime: new FormControl(),
      color: new FormControl()
    });
  }

  onSubmit(value) {
    value.dateTime = new Date().toISOString();
    value.color = this.randomColor();
    this.fbService.createTodo(value)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(['home']);
        }
      );
  }

  cancel() {
    this.resetFields();
    this.router.navigate(['home']);
  }

  randomColor() {
    return this.colors[Math.floor(Math.random() * 7)];
  }

}
