import { TestBed } from '@angular/core/testing';

import { EditTodoService } from './edit-todo.service';

describe('EditTodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditTodoService = TestBed.get(EditTodoService);
    expect(service).toBeTruthy();
  });
});
