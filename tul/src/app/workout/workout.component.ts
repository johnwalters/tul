import { Component, OnInit } from '@angular/core';
import { ExersizeService } from '../exersize.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Workout } from '../workout';
import { WeightUnitOfMeasure } from '../WeightUnitOfMeasure';
import { ExersizeSessionModel } from './ExersizeSessionModel';
import { ExersizeSession } from '../ExersizeSession';
import * as moment from 'moment';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  workoutDate: Date;
  workout: Workout;
  exersizeSessionModels: Array<ExersizeSessionModel>;
  totalRestTimeSeconds: number;
  earliestStartTime: moment.Moment;
  latestStopTime: moment.Moment;
  totalWorkoutSeconds: number;

  constructor(
    private exersizeService: ExersizeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const workoutDateYYYYMMDD = this.route.snapshot.paramMap.get('id');
    this.workoutDate = Workout.fromYYYYMMDD(workoutDateYYYYMMDD);
    this.refresh();

  }

  refresh(): void {
    this.workout = this.exersizeService.getWorkout(this.workoutDate);
    this.exersizeSessionModels = new Array<ExersizeSessionModel>();
    let isAllSessionsHaveStartAndEndDates = true;
    let stringStartTimes = new Array<string>();
    let stringStopTimes = new Array<string>();
    let totalTimeUnderLoadSeconds = 0;
    for (const exersizeSession of this.workout.exersizeSessions.Values()) {
      const model = new ExersizeSessionModel(exersizeSession);
      model.sessionUm = WeightUnitOfMeasure[exersizeSession.weightUnitOfMeasure];
      if (!exersizeSession.startTime || !exersizeSession.stopTime) {
        isAllSessionsHaveStartAndEndDates = false;
      } else {
        stringStartTimes.push(moment( exersizeSession.startTime).toLocaleString());
        stringStopTimes.push(moment( exersizeSession.stopTime).toLocaleString());
        totalTimeUnderLoadSeconds += exersizeSession.TimeUnderLoadSeconds;
      }
      this.exersizeSessionModels.push(model);
    }
    if (isAllSessionsHaveStartAndEndDates) {
      // calculate total rest time (as latestEndTime - earliestStartTime - total time under load)
      stringStartTimes = stringStartTimes.sort();
      stringStopTimes = stringStopTimes.sort();
      this.earliestStartTime = moment(stringStartTimes[0]);
      this.latestStopTime = moment(stringStopTimes[stringStopTimes.length - 1]);
      this.totalWorkoutSeconds = this.latestStopTime.diff(this.earliestStartTime, 'seconds');
      this.totalRestTimeSeconds = this.totalWorkoutSeconds - totalTimeUnderLoadSeconds;

    }
  }

  navToExersize(model: ExersizeSessionModel) {
    this.router.navigateByUrl('/session/' + this.workout.dateYYYYMMDD() + '/' + model.exersizeSession.exersize.name);
  }

  navToAllWorkouts() {
    this.router.navigateByUrl('/workouts');
  }

  addExersize(message: any) {
    const exersizeToAdd = message.exersize;
    this.exersizeService.addExersize(exersizeToAdd);
    const exersizeSession = new ExersizeSession();
    exersizeSession.exersize = message.exersize;
    this.workout.exersizeSessions.Add(exersizeSession.exersize.name , exersizeSession);
    this.exersizeService.addWorkout(this.workout);
    this.router.navigateByUrl('/session/' + this.workout.dateYYYYMMDD() + '/' + exersizeToAdd.name);
  }

  delete(): void {
    this.exersizeService.deleteWorkout(this.workoutDate);
    this.router.navigateByUrl('/workouts');
  }

}


