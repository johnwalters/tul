import { KeyedCollection } from './utilities/KeyedCollection';
import { ExersizeSession } from './ExersizeSession';
import { Exersize } from './exersize';
import { WorkoutData } from './WorkoutData';
import * as moment from 'moment';

export class Workout {
  date: Date;
  exersizeSessions: KeyedCollection<ExersizeSession>; // known by exersize.name
  notes: string;

  public static fromYYYYMMDD(dateYYYYMMDD: string): Date {
    const date = moment(dateYYYYMMDD).toDate();
    return date;
  }

  public static toDateYYYYMMDD(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  public static fromData(workoutData: WorkoutData): Workout {
    const workout = new Workout();
    workout.date = new Date(workoutData.dateString);
    workout.notes = workoutData.notes;
    workout.exersizeSessions = new KeyedCollection<ExersizeSession>();
    for (const exersizeSessionData of workoutData.exersizeSessions) {
      const exersizeSession = new ExersizeSession();
      exersizeSession.exersize = new Exersize();
      exersizeSession.exersize.name = exersizeSessionData.exersize.name;
      exersizeSession.TimeUnderLoadSeconds = exersizeSessionData.TimeUnderLoadSeconds;
      exersizeSession.notes = exersizeSessionData.notes;
      exersizeSession.repititions = exersizeSessionData.repititions;
      exersizeSession.weight = exersizeSessionData.weight;
      exersizeSession.weightUnitOfMeasure = exersizeSessionData.weightUnitOfMeasure;
      exersizeSession.startTime = moment(exersizeSessionData.startTime).toDate();
      exersizeSession.stopTime = moment(exersizeSessionData.stopTime).toDate();
      workout.exersizeSessions.Add(exersizeSession.exersize.name, exersizeSession);
    }
    return workout;
  }

  public static toData(workout: Workout): WorkoutData {
    const workoutData = new WorkoutData();
    workoutData.dateString = workout.date.toString();
    workout.notes = workoutData.notes;
    workoutData.exersizeSessions = new Array<ExersizeSession>();
    for (const exersizeSession of workout.exersizeSessions.Values()) {
      const exersizeSessionData = new ExersizeSession();
      exersizeSessionData.exersize = new Exersize();
      exersizeSessionData.exersize.name = exersizeSession.exersize.name;
      exersizeSessionData.TimeUnderLoadSeconds = exersizeSession.TimeUnderLoadSeconds;
      exersizeSessionData.notes = exersizeSession.notes;
      exersizeSessionData.repititions = exersizeSession.repititions;
      exersizeSessionData.weight = exersizeSession.weight;
      exersizeSessionData.weightUnitOfMeasure = exersizeSession.weightUnitOfMeasure;
      exersizeSessionData.startTime = exersizeSession.startTime;
      exersizeSessionData.stopTime = exersizeSession.stopTime;
      workoutData.exersizeSessions.push(exersizeSessionData);
    }
    return workoutData;
  }

  dateMMDDYY(): string {
    return moment(this.date).format('MM-DD-YY');
  }

  dateYYYYMMDD(): string {
    return moment(this.date).format('YYYY-MM-DD');
  }

  dateMMMDD(): string {
    return moment(this.date).format('MMM DD');
  }
}


