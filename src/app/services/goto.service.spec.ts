import { TestBed, inject } from '@angular/core/testing';

import { GotoService } from './goto.service';

describe('GotoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GotoService]
    });
  });

  it('should be created', inject([GotoService], (service: GotoService) => {
    expect(service).toBeTruthy();
  }));
});
