import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkoutModalComponent } from './add-workout-modal.component';

describe('AddWorkoutModalComponent', () => {
  let component: AddWorkoutModalComponent;
  let fixture: ComponentFixture<AddWorkoutModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkoutModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
