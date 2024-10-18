import { TestBed } from '@angular/core/testing';

import { FirestoreTestService } from './firestore-test.service';

describe('FirestoreTestService', () => {
  let service: FirestoreTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
