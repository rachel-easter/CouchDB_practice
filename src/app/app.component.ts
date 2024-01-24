import { Component } from '@angular/core';
import{EmployeeService}from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management';
  name: string = '';
  id: string = '';
  fingerprintImage: string = '';

  constructor(private employeeService: EmployeeService) {}

  addEmployee() {
    this.employeeService.addEmployee(this.name, this.id, this.fingerprintImage).subscribe(
      (response) => {
        console.log('Employee added successfully:', response);
        // Handle success
      },
      (error) => {
        console.error('Error adding employee:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Status Text:', error.statusText);
          console.error('Body:', error.error);
        }
      }
    );
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fingerprintImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
