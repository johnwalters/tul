import { TestBed } from '@angular/core/testing';

import { ExersizeService } from './exersize.service';

describe('ExersizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExersizeService = TestBed.get(ExersizeService);
    expect(service).toBeTruthy();
  });
});
