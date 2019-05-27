import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExersizeService } from '../exersize.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private router: Router,
    private exersizeService: ExersizeService
  ) { }

  ngOnInit() {
  }

  navToAllWorkouts() {
    this.router.navigateByUrl('/workouts');
  }

  resetExersizeList() {
    this.exersizeService.initializeExersizeList();
    this.navToAllWorkouts();
  }
}
