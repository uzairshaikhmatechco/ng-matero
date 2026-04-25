import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentList } from './admin-student-list';

describe('AdminStudentList', () => {
  let component: AdminStudentList;
  let fixture: ComponentFixture<AdminStudentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStudentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStudentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
