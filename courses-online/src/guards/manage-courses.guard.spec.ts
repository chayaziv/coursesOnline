import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { manageCoursesGuard } from './manage-courses.guard';

describe('manageCoursesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => manageCoursesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
