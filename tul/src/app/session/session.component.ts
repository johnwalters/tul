import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '../workout';
import { ExersizeService } from '../exersize.service';
import { ExersizeSession } from '../ExersizeSession';
import { WeightUnitOfMeasure } from '../WeightUnitOfMeasure';
import * as moment from 'moment';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  workoutDate: Date;
  workout: Workout;
  exersizeSession: ExersizeSession;
  exersizeName: string;

  timerCounter: number;
  timerRef;
  timerIsRunning = false;
  timerText = 'Start';

  UnitOfMeasureString: string;

  constructor(
    private exersizeService: ExersizeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    const workoutDateYYYYMMDD = this.route.snapshot.paramMap.get('id');
    this.exersizeName = this.route.snapshot.paramMap.get('eid');
    this.workoutDate = Workout.fromYYYYMMDD(workoutDateYYYYMMDD);
    this.workout = this.exersizeService.getWorkout(this.workoutDate);
    this.exersizeSession = this.workout.exersizeSessions.Item(this.exersizeName);

  }

  setUm(val: string) {
    this.exersizeSession.weightUnitOfMeasure = WeightUnitOfMeasure[val];
    this.save();
  }

  save() {
    this.exersizeService.addWorkout(this.workout);
  }

  startTimer() {
    this.timerIsRunning = !this.timerIsRunning;
    if (this.timerIsRunning) {
      this.timerText = 'Stop';
      const thisMoment = moment();
      this.exersizeSession.startTime = thisMoment.add(- (this.timerCounter || 0)).toDate();
      this.timerRef = setInterval(() => {
        this.timerCounter = moment().diff(this.exersizeSession.startTime);
      });
    } else {
      this.timerText = 'Resume';
      this.exersizeSession.TimeUnderLoadSeconds = parseInt((this.timerCounter / 1000).toString(), 10) + 1;
      this.exersizeSession.stopTime = moment().toDate();
      this.save();
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.timerIsRunning = false;
    this.timerText = 'Start';
    this.timerCounter = undefined;
    this.exersizeSession.TimeUnderLoadSeconds = 0;
    this.exersizeSession.startTime = null;
    this.exersizeSession.stopTime = null;
    this.save();
    clearInterval(this.timerRef);
  }

  delete() {
    this.workout.exersizeSessions.Remove(this.exersizeName);
    this.save();
    this.router.navigateByUrl('/workout/' + this.workout.dateYYYYMMDD());

  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

}
