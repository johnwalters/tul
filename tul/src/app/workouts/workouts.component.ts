import { Component, OnInit } from '@angular/core';
import { Exersize } from '../exersize';
import { ExersizeService } from '../exersize.service';
import { WorkoutModel } from './WorkoutModel';

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
  ) { }

  ngOnInit() {
    // this.loadExersizes();
    this.loadWorkouts();
  }

  addWorkout(message: any) {
    this.exersizeService.createWorkoutForDate(message.workoutDate);
    this.loadWorkouts();
  }

  promptToDelete(model: WorkoutModel): void {
    model.isDeletePending = !model.isDeletePending;
  }

  delete(model: WorkoutModel): void {
    this.exersizeService.deleteWorkout(model.workout.date);
    this.loadWorkouts();
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


