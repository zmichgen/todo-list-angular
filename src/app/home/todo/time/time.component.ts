import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {
  @Input() time: string;
  @Input() isDone: boolean;
  constructor() { }

  ngOnInit() {
  }

}
