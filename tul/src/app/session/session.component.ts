import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workout } from '../workout';
import { ExersizeService } from '../exersize.service';
import { ExersizeSession } from '../ExersizeSession';

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

  constructor(
    private exersizeService: ExersizeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const workoutDateYYYYMMDD = this.route.snapshot.paramMap.get('id');
    this.exersizeName = this.route.snapshot.paramMap.get('eid');
    this.workoutDate = Workout.fromYYYYMMDD(workoutDateYYYYMMDD);
    this.workout = this.exersizeService.getWorkout(this.workoutDate);
    this.exersizeSession = this.workout.exersizeSessions.Item(this.exersizeName);
  }

  save() {
    this.exersizeService.addWorkout(this.workout);
  }

  startTimer() {
    this.timerIsRunning = !this.timerIsRunning;
    if (this.timerIsRunning) {
      this.timerText = 'Stop';
      const startTime = Date.now() - (this.timerCounter || 0);
      this.timerRef = setInterval(() => {
        this.timerCounter = Date.now() - startTime;
      });
    } else {
      this.timerText = 'Resume';
      this.exersizeSession.TimeUnderLoadSeconds = parseInt((this.timerCounter / 1000).toString(), 10) + 1;
      this.save();
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.timerIsRunning = false;
    this.timerText = 'Start';
    this.timerCounter = undefined;
    this.exersizeSession.TimeUnderLoadSeconds = 0;
    this.save();
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

}
