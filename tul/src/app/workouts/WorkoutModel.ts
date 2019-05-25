import { Workout } from '../workout';
export class WorkoutModel {
  public workout: Workout;
  public isDeletePending = false;
  constructor(workout: Workout) {
    this.workout = workout;
  }
}
