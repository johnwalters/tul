import { Component, OnInit } from '@angular/core';
import { ExersizeService } from '../exersize.service';
import { Exersize } from '../exersize';
import { Workout } from '../workout';
import * as moment from 'moment';
import { WeightUnitOfMeasure } from '../WeightUnitOfMeasure';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  status = 'ready to test';
  exersizes = Array<Exersize>();
  workouts = Array<Workout>();
  log = Array<string>();
  isDeleteWorkoutsAfterCrud = true;

  constructor(
    private exersizeService: ExersizeService,
  ) {
    this.clearLog();
  }

  ngOnInit() {
    this.loadExersizes();
    this.loadWorkouts();
  }

  exersizeCrud(): void {
    this.logMessage('starting exersize crud');
    this.logMessage('clearing all exersizes');
    for (const exersize of this.exersizeService.getAllExersizes().Values() ) {
      this.exersizeService.deleteExersize(exersize.name);
    }
    this.logMessage('adding  exersize "seated row"');
    const exersize1 = new Exersize();
    exersize1.name = 'seated row';
    this.exersizeService.addExersize(exersize1);
    this.loadExersizes();

    this.logMessage('getting  exersize "seated row"');
    const exersize1Check = this.exersizeService.getExersize(exersize1.name);
    this.assert(exersize1Check != null, 'getting  exersize "seated row"');

    this.logMessage('adding  exersize "chest press"');
    const exersize2 = new Exersize();
    exersize2.name = 'chest press';
    this.exersizeService.addExersize(exersize2);
    this.loadExersizes();

    this.logMessage('adding  exersize "shoulder press"');
    const exersize3 = new Exersize();
    exersize3.name = 'shoulder press';
    this.exersizeService.addExersize(exersize3);
    this.loadExersizes();

    this.logMessage('deleting  exersize "chest press"');
    this.exersizeService.deleteExersize('chest press');
    this.loadExersizes();

    this.logMessage('getting  exersize "chest press"');
    const exersize2Check = this.exersizeService.getExersize(exersize2.name);
    this.assert(exersize2Check == null, 'deleting  exersize "chest press"');

    this.logMessage('deleting  exersize "shoulder press"');
    this.exersizeService.deleteExersize('shoulder press');
    this.loadExersizes();

    this.logMessage('deleting  exersize "seated row"');
    this.exersizeService.deleteExersize('seated row');
    this.loadExersizes();

    this.assert(this.exersizes.length === 0, 'exersize crud');

  }

  workoutCrud(): void {
    this.logMessage('starting workout crud');
    this.logMessage('clearing all workouts');
    for (const workout of this.exersizeService.getAllWorkouts().Values() ) {
      this.exersizeService.deleteWorkout(workout.date);
    }

    this.logMessage('clearing all exersizes');
    for (const exersize of this.exersizeService.getAllExersizes().Values() ) {
      this.exersizeService.deleteExersize(exersize.name);
    }

    this.logMessage('adding  exersize "seated row"');
    const exersize1 = new Exersize();
    exersize1.name = 'seated row';
    this.exersizeService.addExersize(exersize1);

    this.logMessage('adding  exersize "chest press"');
    const exersize2 = new Exersize();
    exersize2.name = 'chest press';
    this.exersizeService.addExersize(exersize2);


    this.logMessage('adding  exersize "shoulder press"');
    const exersize3 = new Exersize();
    exersize3.name = 'shoulder press';
    this.exersizeService.addExersize(exersize3);

    this.logMessage('adding  exersize "pull down"');
    this.exersizeService.addExersize(new Exersize({name: 'pull down'}));

    this.logMessage('adding  exersize "leg press"');
    this.exersizeService.addExersize(new Exersize({name: 'leg press'}));

    // create a workout
    const workout1Date = moment('2017-01-26').toDate();
    this.logMessage('adding  workout for date' + workout1Date.toString());
    let workout1 = new Workout();
    workout1.date = workout1Date;
    workout1 = this.exersizeService.populateWorkoutWithExersizeSessions(workout1);

    const workout1SeatedRowSession = workout1.exersizeSessions.Item('seated row');
    workout1SeatedRowSession.TimeUnderLoadSeconds = 90;
    workout1SeatedRowSession.notes = 'less weight';
    workout1SeatedRowSession.repititions = null;
    workout1SeatedRowSession.weight = 135;
    workout1SeatedRowSession.weightUnitOfMeasure = WeightUnitOfMeasure.units;

    const workout1ChestPressSession = workout1.exersizeSessions.Item('chest press');
    workout1ChestPressSession.TimeUnderLoadSeconds = 90;
    workout1ChestPressSession.notes = '';
    workout1ChestPressSession.repititions = null;
    workout1ChestPressSession.weight = 14;
    workout1ChestPressSession.weightUnitOfMeasure = WeightUnitOfMeasure.pounds;

    const workout1ShoulderPressSession = workout1.exersizeSessions.Item('shoulder press');
    workout1ShoulderPressSession.TimeUnderLoadSeconds = 60;
    workout1ShoulderPressSession.notes = 'foo shoulder';
    workout1ShoulderPressSession.repititions = null;
    workout1ShoulderPressSession.weight = 6;
    workout1ShoulderPressSession.weightUnitOfMeasure = WeightUnitOfMeasure.units;

    this.exersizeService.addWorkout(workout1);
    this.loadWorkouts();

    // create another workout
    const workout2Date = moment('2017-01-27').toDate();
    this.logMessage('adding  workout for date ' + workout2Date.toString());
    let workout2 = new Workout();
    workout2.date = workout2Date;
    workout2 = this.exersizeService.populateWorkoutWithExersizeSessions(workout2);
    const seatedRowSession = workout2.exersizeSessions.Item('seated row');
    seatedRowSession.TimeUnderLoadSeconds = 121;
    seatedRowSession.notes = 'do it more';
    seatedRowSession.repititions = null;
    seatedRowSession.weight = 115;
    seatedRowSession.weightUnitOfMeasure = WeightUnitOfMeasure.units;

    const workout2ChestPressSession = workout2.exersizeSessions.Item('chest press');
    workout2ChestPressSession.TimeUnderLoadSeconds = 107;
    workout2ChestPressSession.notes = '';
    workout2ChestPressSession.repititions = null;
    workout2ChestPressSession.weight = 15;
    workout2ChestPressSession.weightUnitOfMeasure = WeightUnitOfMeasure.units;

    const workout2ShoulderPressSession = workout2.exersizeSessions.Item('shoulder press');
    workout2ShoulderPressSession.TimeUnderLoadSeconds = 190;
    workout2ShoulderPressSession.notes = 'my shoulders hurt';
    workout2ShoulderPressSession.repititions = null;
    workout2ShoulderPressSession.weight = 4;
    workout2ShoulderPressSession.weightUnitOfMeasure = WeightUnitOfMeasure.kilograms;

    this.exersizeService.addWorkout(workout2);
    this.loadWorkouts();

    this.logMessage('getting workout for date ' + workout1Date.toString());
    let workout1Check = this.exersizeService.getWorkout(workout1Date);
    this.assert(workout1Check != null, 'getting workout 1');

    this.logMessage('getting workout for date ' + workout2Date.toString());
    let workout2Check = this.exersizeService.getWorkout(workout2Date);
    this.assert(workout2Check != null, 'getting workout 2');

    if (!this.isDeleteWorkoutsAfterCrud) return;
    this.logMessage('deleting  exersize "chest press"');
    this.exersizeService.deleteExersize('chest press');

    this.logMessage('deleting  exersize "shoulder press"');
    this.exersizeService.deleteExersize('shoulder press');

    this.logMessage('deleting  exersize "seated row"');
    this.exersizeService.deleteExersize('seated row');

    this.logMessage('deleting  exersize "leg press"');
    this.exersizeService.deleteExersize('leg press');

    this.logMessage('deleting  exersize "pull down"');
    this.exersizeService.deleteExersize('pull down');

    this.logMessage('deleting workout for date ' + workout1Date.toString());
    this.exersizeService.deleteWorkout(workout1Date);
    workout1Check = this.exersizeService.getWorkout(workout1Date);
    this.assert(workout1Check == null, 'deleting workout 1');

    this.logMessage('deleting workout for date ' + workout2Date.toString());
    this.exersizeService.deleteWorkout(workout2Date);
    workout2Check = this.exersizeService.getWorkout(workout2Date);
    this.assert(workout2Check == null, 'deleting workout 2');

    this.loadWorkouts();
  }

  createWorkoutForDateTest() {
    this.logMessage('starting createWorkoutForDate test');
    this.logMessage('clearing all workouts');
    for (const workout of this.exersizeService.getAllWorkouts().Values() ) {
      this.exersizeService.deleteWorkout(workout.date);
    }

    this.logMessage('clearing all exersizes');
    for (const exersize of this.exersizeService.getAllExersizes().Values() ) {
      this.exersizeService.deleteExersize(exersize.name);
    }

    this.logMessage('adding  exersize "seated row"');
    const exersize1 = new Exersize();
    exersize1.name = 'seated row';
    this.exersizeService.addExersize(exersize1);

    this.logMessage('adding  exersize "chest press"');
    const exersize2 = new Exersize();
    exersize2.name = 'chest press';
    this.exersizeService.addExersize(exersize2);


    this.logMessage('adding  exersize "shoulder press"');
    const exersize3 = new Exersize();
    exersize3.name = 'shoulder press';
    this.exersizeService.addExersize(exersize3);

    // create a workout
    const workout1Date = moment('2019-04-10').toDate();
    this.logMessage('adding  workout for date ' + workout1Date.toString());
    let workout1 = new Workout();
    workout1.date = workout1Date;
    workout1 = this.exersizeService.populateWorkoutWithExersizeSessions(workout1);

    const workout1SeatedRowSession = workout1.exersizeSessions.Item('seated row');
    workout1SeatedRowSession.TimeUnderLoadSeconds = 90;
    workout1SeatedRowSession.notes = 'less weight';
    workout1SeatedRowSession.repititions = null;
    workout1SeatedRowSession.weight = 135;
    workout1SeatedRowSession.weightUnitOfMeasure = WeightUnitOfMeasure.units;

    const workout1ChestPressSession = workout1.exersizeSessions.Item('chest press');
    workout1ChestPressSession.TimeUnderLoadSeconds = 90;
    workout1ChestPressSession.notes = '';
    workout1ChestPressSession.repititions = null;
    workout1ChestPressSession.weight = 14;
    workout1ChestPressSession.weightUnitOfMeasure = WeightUnitOfMeasure.pounds;

    const workout1ShoulderPressSession = workout1.exersizeSessions.Item('shoulder press');
    workout1ShoulderPressSession.TimeUnderLoadSeconds = 60;
    workout1ShoulderPressSession.notes = 'foo shoulder';
    workout1ShoulderPressSession.repititions = null;
    workout1ShoulderPressSession.weight = 6;
    workout1ShoulderPressSession.weightUnitOfMeasure = WeightUnitOfMeasure.units;

    this.exersizeService.addWorkout(workout1);
    let workout1Check = this.exersizeService.getWorkout(workout1Date);
    this.loadWorkouts();

    // create a prior workout
    const workoutPDate = moment('2019-03-31').toDate();
    this.logMessage('adding workout for date ' + workoutPDate.toString());
    let workoutP = new Workout();
    workoutP.date = workoutPDate;
    workoutP = this.exersizeService.populateWorkoutWithExersizeSessions(workoutP);

    const workoutPSeatedRowSession = workoutP.exersizeSessions.Item('seated row');
    workoutPSeatedRowSession.TimeUnderLoadSeconds = 40;
    workoutPSeatedRowSession.notes = '';
    workoutPSeatedRowSession.repititions = null;
    workoutPSeatedRowSession.weight = 140;
    workoutPSeatedRowSession.weightUnitOfMeasure = WeightUnitOfMeasure.units;

    const workoutPChestPressSession = workoutP.exersizeSessions.Item('chest press');
    workoutPChestPressSession.TimeUnderLoadSeconds = 180;
    workoutPChestPressSession.notes = '';
    workoutPChestPressSession.repititions = null;
    workoutPChestPressSession.weight = 13;
    workoutPChestPressSession.weightUnitOfMeasure = WeightUnitOfMeasure.kilograms;

    const workoutPShoulderPressSession = workoutP.exersizeSessions.Item('shoulder press');
    workoutPShoulderPressSession.TimeUnderLoadSeconds = 61;
    workoutPShoulderPressSession.notes = 'bar shoulder';
    workoutPShoulderPressSession.repititions = null;
    workoutPShoulderPressSession.weight = 8;
    workoutPShoulderPressSession.weightUnitOfMeasure = WeightUnitOfMeasure.units;

    this.exersizeService.addWorkout(workoutP);
    let workoutPCheck = this.exersizeService.getWorkout(workoutPDate);
    this.loadWorkouts();

    // create another workout
    const workout2Date = moment('2019-04-27').toDate();
    this.logMessage('creating  workout for date ' + workout2Date.toString());
    this.exersizeService.createWorkoutForDate(workout2Date);
    const workout2 = this.exersizeService.getWorkout(workout2Date);
    this.assert(workout2 != null, 'getting workout 2');
    const w2secs = workout2.exersizeSessions.Item('seated row').TimeUnderLoadSeconds;
    const w1secs = workout1Check.exersizeSessions.Item('seated row').TimeUnderLoadSeconds;
    this.assert(w1secs !== w2secs, 'workout 2 seated row seconds not same as workout 1');

    this.loadWorkouts();


    this.logMessage('getting workout for date ' + workout2Date.toString());
    let workout2Check = this.exersizeService.getWorkout(workout2Date);
    this.assert(workout2Check != null, 'getting workout 2');

    // ---------------------------
    if (!this.isDeleteWorkoutsAfterCrud) return;
    this.logMessage('deleting  exersize "chest press"');
    this.exersizeService.deleteExersize('chest press');

    this.logMessage('deleting  exersize "shoulder press"');
    this.exersizeService.deleteExersize('shoulder press');

    this.logMessage('deleting  exersize "seated row"');
    this.exersizeService.deleteExersize('seated row');

    this.logMessage('deleting workout for date ' + workout1Date.toString());
    this.exersizeService.deleteWorkout(workout1Date);
    workout1Check = this.exersizeService.getWorkout(workout1Date);
    this.assert(workout1Check == null, 'deleting workout 1');

    this.logMessage('deleting workout for date ' + workout2Date.toString());
    this.exersizeService.deleteWorkout(workout2Date);
    workout2Check = this.exersizeService.getWorkout(workout2Date);
    this.assert(workout2Check == null, 'deleting workout 2');

    this.logMessage('deleting workout for date ' + workoutPDate.toString());
    this.exersizeService.deleteWorkout(workoutPDate);
    workoutPCheck = this.exersizeService.getWorkout(workoutPDate);
    this.assert(workoutPCheck == null, 'deleting workout P');

    this.loadWorkouts();
  }

  clearWorkouts(): void {
    // clean up
    this.logMessage('deleting  exersize "chest press"');
    this.exersizeService.deleteExersize('chest press');

    this.logMessage('deleting  exersize "shoulder press"');
    this.exersizeService.deleteExersize('shoulder press');

    this.logMessage('deleting  exersize "seated row"');
    this.exersizeService.deleteExersize('seated row');

  }

  changeIsDeleteWorkoutsAfterCrud(): void {
    this.isDeleteWorkoutsAfterCrud = !this.isDeleteWorkoutsAfterCrud;
  }

  private logMessage(message: string): void {
    this.status = message;
    this.log.push(message);
  }

  clearLog(): void {
      this.log = new Array<string>();
  }

  private loadExersizes(): void {
    this.exersizes =  this.exersizeService.getAllExersizes().Values();
  }

  private loadWorkouts(): void {
    this.workouts =  this.exersizeService.getAllWorkouts().Values();
  }

  private assert(condition: boolean, testName: string): void {
    if (condition) {
      this.logMessage(testName + ' succeeded');
    } else {
      this.logMessage(testName + ' failed');
    }
  }
}
