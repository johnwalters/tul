import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-add-workout-modal',
  templateUrl: './add-workout-modal.component.html',
  styleUrls: ['./add-workout-modal.component.css']
})
export class AddWorkoutModalComponent implements OnInit {

  display: string;
  isOpen = false;
  workoutDate: Date;
  workoutDateString: string;

  @Output() addWorkout = new EventEmitter();
  constructor() {}

  ngOnInit() {
    this.display = 'none';

  }

  openModal() {
    this.workoutDate = new Date(Date.now());
    this.workoutDateString =  moment(this.workoutDate).format('YYYY-MM-DD');
    this.isOpen = true;
    this.display = 'block';
  }

  onCloseHandled() {
    this.isOpen = false;
    this.display = 'none';
  }

  onAddWorkout() {
    this.workoutDate = moment(this.workoutDateString).toDate();
    this.addWorkout.emit({ workoutDate: this.workoutDate });
    this.onCloseHandled();
  }

}
