import { TestBed } from '@angular/core/testing';

import { IntegrationApiService } from './integration-api.service';

describe('IntegrationApiService', () => {
  let service: IntegrationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegrationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
