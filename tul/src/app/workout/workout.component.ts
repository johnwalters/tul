import { Component, OnInit } from '@angular/core';
import { ExersizeService } from '../exersize.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Workout } from '../workout';
import { WeightUnitOfMeasure } from '../WeightUnitOfMeasure';
import { ExersizeSessionModel } from './ExersizeSessionModel';
import { ExersizeSession } from '../ExersizeSession';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  workoutDate: Date;
  workout: Workout;
  exersizeSessionModels: Array<ExersizeSessionModel>;

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
    for (const exersizeSession of this.workout.exersizeSessions.Values()) {
      const model = new ExersizeSessionModel(exersizeSession);
      model.sessionUm = WeightUnitOfMeasure[exersizeSession.weightUnitOfMeasure];
      this.exersizeSessionModels.push(model);
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


