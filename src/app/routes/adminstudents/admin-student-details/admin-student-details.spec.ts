import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentDetails } from './admin-student-details';

describe('AdminStudentDetails', () => {
  let component: AdminStudentDetails;
  let fixture: ComponentFixture<AdminStudentDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStudentDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStudentDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
