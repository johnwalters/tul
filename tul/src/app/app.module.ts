import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { AppRoutingModule } from './app-routing.module';
import { SessionComponent } from './session/session.component';
import { TestComponent } from './test/test.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { AddWorkoutModalComponent } from './add-workout-modal/add-workout-modal.component';
import { ModalTemplateComponent } from './utilities/modal-template/modal-template.component';
import { WorkoutComponent } from './workout/workout.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    SessionComponent,
    TestComponent,
    WorkoutsComponent,
    AddWorkoutModalComponent,
    ModalTemplateComponent,
    WorkoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
