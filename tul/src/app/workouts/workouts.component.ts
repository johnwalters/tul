import { Component, OnInit } from '@angular/core';
import { Exersize } from '../exersize';
import { Workout } from '../workout';
import { ExersizeService } from '../exersize.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  exersizes = Array<Exersize>();
  workouts = Array<Workout>();

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

  private loadExersizes(): void {
    this.exersizes =  this.exersizeService.getAllExersizes().Values();
  }

  private loadWorkouts(): void {
    this.workouts =  this.exersizeService.getAllWorkouts().Values();
  }

}
