import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-student-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './admin-student-details.html',
  styleUrls: ['./admin-student-details.scss']
})
export class AdminStudentDetails implements OnInit {

  studentForm!: FormGroup;

  genders = ['Male', 'Female', 'Other'];
  courses = ['B.Tech', 'BCA', 'BBA', 'M.Tech', 'MBA'];
  departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Management'];
  years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  nationalities = ['Indian', 'American', 'Canadian', 'German', 'Australian'];

  skillList = [
    'C++', 'Java', 'Python', 'Angular', 'React', 'Node.js',
    'Machine Learning', 'UI/UX', 'Cyber Security', 'Cloud Computing'
  ];

  filteredSkills = [...this.skillList];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      studentId: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
      nationality: ['', Validators.required],
      department: ['', Validators.required],
      year: ['', Validators.required],
      skills: [[]],           // Multi-select
      course: ['', Validators.required],
      address: ['', Validators.required],
      guardianName: ['', Validators.required],
      guardianPhone: ['', [Validators.pattern(/^[0-9]{10,15}$/)]]
    });
  }

  searchSkills(event: any) {
    const value = event.target.value.toLowerCase();
    this.filteredSkills = this.skillList.filter(s => s.toLowerCase().includes(value));
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      console.log('Form Value:', this.studentForm.value);
      // TODO: API call here
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.studentForm.reset();
  }
}
