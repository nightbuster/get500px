import { TestBed, inject } from '@angular/core/testing';

import { Api500pxService } from './api500px.service';

describe('Api500pxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Api500pxService]
    });
  });

  it('should be created', inject([Api500pxService], (service: Api500pxService) => {
    expect(service).toBeTruthy();
  }));
});
