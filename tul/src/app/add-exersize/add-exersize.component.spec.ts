import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExersizeComponent } from './add-exersize.component';

describe('AddExersizeComponent', () => {
  let component: AddExersizeComponent;
  let fixture: ComponentFixture<AddExersizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExersizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExersizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
