import { Injectable } from '@angular/core';
import { Exersize } from './exersize';
import { KeyedCollection } from './utilities/KeyedCollection';
import { LocalStorageService } from './utilities/local-storage.service';
import { Workout } from './workout';
import { WorkoutData } from './WorkoutData';
import { ExersizeSession } from './ExersizeSession';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ExersizeService {

  private LOCAL_STORAGE_KEY_EXERSIZES = 'tul_exersizes';
  private LOCAL_STORAGE_KEY_WORKOUTS = 'tul_workouts';
  private exersizes: KeyedCollection<Exersize>;
  private workouts: KeyedCollection<Workout>;

  constructor(
    private localStorageService: LocalStorageService,
  ) {
    this.loadExersizes();
    this.loadWorkouts();
  }

  public addExersize(exersize: Exersize): void {
    this.exersizes.Add(exersize.name, exersize);
    this.saveExersizes();
  }

  public deleteExersize(name: string): void {
    this.exersizes.Remove(name);
    this.saveExersizes();
  }

  public getAllExersizes(): KeyedCollection<Exersize> {
    return this.exersizes;
  }

  public getExersize(name: string): Exersize {
    return this.exersizes.Item(name);
  }

  public addWorkout(workout: Workout): void {
    this.workouts.Add(workout.date.toString(), workout);
    this.saveWorkouts();
  }

  public createWorkoutForDate(date: Date): void {
    let workout = new Workout();
    workout.date = date;
    // TODO: if previous (by date) workout exist, populate from that previous workout
    const fromWorkout = this.findMostRecentWorkout();
    if (!fromWorkout) {
      workout = this.populateWorkoutWithExersizeSessions(workout);
    } else {
      workout = this.populateWorkoutWithExersizeSessionsFromAnotherWorkout(fromWorkout, workout);
    }
    this.addWorkout(workout);
  }

  public populateWorkoutWithExersizeSessions(workout: Workout): Workout {

    workout.exersizeSessions = new KeyedCollection<ExersizeSession>();
    for (const exersize of this.getAllExersizes().Values()) {
      const exersizeSession = new ExersizeSession();
      exersizeSession.exersize = exersize;
      workout.exersizeSessions.Add(exersizeSession.exersize.name, exersizeSession);
    }
    return workout;
  }

  public populateWorkoutWithExersizeSessionsFromAnotherWorkout(fromWorkout: Workout, toWorkout: Workout): Workout {
    toWorkout.exersizeSessions = new KeyedCollection<ExersizeSession>();
    for (const fromExersizeSession of fromWorkout.exersizeSessions.Values()) {
      const toExersizeSession = new ExersizeSession();
      toExersizeSession.exersize = fromExersizeSession.exersize;
      toExersizeSession.weight = fromExersizeSession.weight;
      toExersizeSession.weightUnitOfMeasure = fromExersizeSession.weightUnitOfMeasure;
      toWorkout.exersizeSessions.Add(toExersizeSession.exersize.name, toExersizeSession);
    }
    return toWorkout;
  }

  public deleteWorkout(date: Date): void {
    this.workouts.Remove(date.toString());
    this.saveWorkouts();
  }

  public getAllWorkouts(): KeyedCollection<Workout> {
    this.loadWorkouts();
    return this.workouts;
  }

  public getWorkout(date: Date): Workout {
    return this.workouts.Item(date.toString());
  }

  private findMostRecentWorkout(): Workout {
    if (this.workouts.Keys().length === 0) return null;
    this.sortWorkouts();
    const mostRecentWorkoutKey = this.workouts.Keys()[0];
    return this.workouts.Item(mostRecentWorkoutKey);
  }

  private saveExersizes() {
    this.localStorageService.writeObject(this.LOCAL_STORAGE_KEY_EXERSIZES, this.exersizes.Values());
   }

   private loadExersizes() {
    const exersizeList = this.localStorageService.readObject<Array<Exersize>>(this.LOCAL_STORAGE_KEY_EXERSIZES);
    this.exersizes = new KeyedCollection<Exersize>();
    if (!exersizeList) {
      this.initializeExersizeList();
      return;
    }
    for (const exersize of exersizeList) {
      this.exersizes.Add(exersize.name, exersize);
    }
   }

   private initializeExersizeList(): void {
    this.addExersize(new Exersize({name: 'seated row'}));
    this.addExersize(new Exersize({name: 'pull down'}));
    this.addExersize(new Exersize({name: 'chest press'}));
    this.addExersize(new Exersize({name: 'shoulder press'}));
    this.addExersize(new Exersize({name: 'leg press'}));
   }

   private saveWorkouts() {
     this.sortWorkouts();
     const workoutDataList = Array<WorkoutData>();
     for (const workout of this.workouts.Values()) {
      const workoutData = Workout.toData(workout);
       workoutDataList.push(workoutData);
     }
    this.localStorageService.writeObject(this.LOCAL_STORAGE_KEY_WORKOUTS, workoutDataList);
   }

   private loadWorkouts() {
    const workoutList = this.localStorageService.readObject<Array<WorkoutData>>(this.LOCAL_STORAGE_KEY_WORKOUTS);
    this.workouts = new KeyedCollection<Workout>();
    if (!workoutList) return;
    for (const workoutData of workoutList) {
      const workout = Workout.fromData(workoutData);
      this.workouts.Add(workout.date.toString(), workout);
    }
   }

  private sortWorkouts(): void {
    // sort by date, desc
    const sortedWorkoutDates = _.sortBy(this.workouts.Keys(), function (dateKey: string) { return -(new Date(dateKey).getTime()); });
    const sortedWorkouts = new KeyedCollection<Workout>();
    for (const workoutDate of sortedWorkoutDates) {
      sortedWorkouts.Add(workoutDate.toString(), this.workouts.Item(workoutDate));
    }
    this.workouts = sortedWorkouts;
  }
}
