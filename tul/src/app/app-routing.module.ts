import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';

const routes: Routes = [
  { path: '', redirectTo: '/timer', pathMatch: 'full' },
  { path: 'timer', component: TimerComponent },

];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
