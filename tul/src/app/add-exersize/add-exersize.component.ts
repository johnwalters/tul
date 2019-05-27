import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exersize } from '../exersize';
import { Workout } from '../workout';
import { ExersizeSession } from '../ExersizeSession';

@Component({
  selector: 'app-add-exersize',
  templateUrl: './add-exersize.component.html',
  styleUrls: ['./add-exersize.component.css']
})
export class AddExersizeComponent implements OnInit {

  display: string;
  isOpen = false;
  exersizeName: string;

  @Input() workout: Workout;
  @Output() addExersize = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.exersizeName = '';
    this.display = 'none';

  }

  openModal() {
    this.isOpen = true;
    this.display = 'block';
  }

  onCloseHandled() {
    this.isOpen = false;
    this.display = 'none';
  }

  onAddExersize() {
    const exersize = new Exersize({name: this.exersizeName});

    this.addExersize.emit({ exersize });
    this.onCloseHandled();
  }

}
