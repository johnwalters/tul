import { Component, OnInit } from '@angular/core';
import { Exersize } from '../exersize';
import { ExersizeService } from '../exersize.service';
import { WorkoutModel } from './WorkoutModel';
import { Router } from '@angular/router';
import { Workout } from '../workout';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  exersizes = Array<Exersize>();
  workoutModels = Array<WorkoutModel>();

  constructor(
    private exersizeService: ExersizeService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.loadExersizes();
    this.loadWorkouts();
  }

  addWorkout(message: any) {
    this.exersizeService.createWorkoutForDate(message.workoutDate);
    this.navToWorkout(message.workoutDate);
  }

  promptToDelete(model: WorkoutModel): void {
    model.isDeletePending = !model.isDeletePending;
  }

  delete(model: WorkoutModel): void {
    this.exersizeService.deleteWorkout(model.workout.date);
    this.loadWorkouts();
  }

  navToSettings(): void {
    this.router.navigateByUrl('/settings');
  }

  navToWorkout(workoutDate: Date): void {
    this.router.navigateByUrl('/workout/' + Workout.toDateYYYYMMDD(workoutDate));
  }


  private loadExersizes(): void {
    this.exersizes =  this.exersizeService.getAllExersizes().Values();
  }

  private loadWorkouts(): void {
    this.workoutModels = new Array<WorkoutModel>();
    for (const workout of this.exersizeService.getAllWorkouts().Values()) {
      this.workoutModels.push(new WorkoutModel(workout));
    }

  }



}


