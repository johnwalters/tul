import { Component, OnInit } from '@angular/core';
import { ExersizeService } from '../exersize.service';
import { Exersize } from '../exersize';
import { Workout } from '../workout';
import { WorkoutData } from '../WorkoutData';

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

    // create a workout
    const workout1Date = new Date('2017-01-26');
    this.logMessage('adding  workout for date' + workout1Date.toString());
    let workout1 = new Workout();
    workout1.date = workout1Date;
    workout1 = this.exersizeService.populateWorkoutWithExersizeSessions(workout1);
    this.exersizeService.addWorkout(workout1);
    this.loadWorkouts();

    // create another workout
    const workout2Date = new Date('2017-01-27');
    this.logMessage('adding  workout for date' + workout2Date.toString());
    let workout2 = new Workout();
    workout2.date = workout2Date;
    workout2 = this.exersizeService.populateWorkoutWithExersizeSessions(workout2);
    this.exersizeService.addWorkout(workout2);
    this.loadWorkouts();

    this.logMessage('getting workout for date' + workout1Date.toString());
    let workout1Check = this.exersizeService.getWorkout(workout1Date);
    this.assert(workout1Check != null, 'getting workout 1');

    this.logMessage('getting workout for date' + workout2Date.toString());
    let workout2Check = this.exersizeService.getWorkout(workout2Date);
    this.assert(workout2Check != null, 'getting workout 2');

    if (!this.isDeleteWorkoutsAfterCrud) return;
    this.logMessage('deleting  exersize "chest press"');
    this.exersizeService.deleteExersize('chest press');

    this.logMessage('deleting  exersize "shoulder press"');
    this.exersizeService.deleteExersize('shoulder press');

    this.logMessage('deleting  exersize "seated row"');
    this.exersizeService.deleteExersize('seated row');

    this.logMessage('deleting workout for date' + workout1Date.toString());
    this.exersizeService.deleteWorkout(workout1Date);
    workout1Check = this.exersizeService.getWorkout(workout1Date);
    this.assert(workout1Check == null, 'deleting workout 1');

    this.logMessage('deleting workout for date' + workout2Date.toString());
    this.exersizeService.deleteWorkout(workout2Date);
    workout2Check = this.exersizeService.getWorkout(workout2Date);
    this.assert(workout2Check == null, 'deleting workout 2');

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

    private clearLog(): void {
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
