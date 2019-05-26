import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { SessionComponent } from './session/session.component';
import { TestComponent } from './test/test.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },
  { path: 'timer', component: TimerComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'session/:id/:eid', component: SessionComponent },
  { path: 'test', component: TestComponent },
  { path: 'workout/:id', component: WorkoutComponent },

];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
