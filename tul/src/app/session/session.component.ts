import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workout } from '../workout';
import { ExersizeService } from '../exersize.service';
import { ExersizeSession } from '../ExersizeSession';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  workoutDate: Date;
  workout: Workout;
  exersizeSession: ExersizeSession;
  exersizeName: string;

  constructor(
    private exersizeService: ExersizeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const workoutDateYYYYMMDD = this.route.snapshot.paramMap.get('id');
    this.exersizeName = this.route.snapshot.paramMap.get('eid');
    this.workoutDate = Workout.fromYYYYMMDD(workoutDateYYYYMMDD);
    this.workout = this.exersizeService.getWorkout(this.workoutDate);
    this.exersizeSession = this.workout.exersizeSessions.Item(this.exersizeName);
  }

  save() {
    this.exersizeService.addWorkout(this.workout);
  }

}
