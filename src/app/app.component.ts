import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from './models/Employee';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_19_curd';
  employeeForm: FormGroup = new FormGroup({});

  empObj: Employee = new Employee();

  empList: Employee[] = [];


  constructor() {
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData)
      this.empList = parseData;
    }

  }

  createForm() {
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.empObj.empid),
      empName: new FormControl(this.empObj.empName, [Validators.required]),
      contact: new FormControl(this.empObj.contact, [Validators.required]),
      email: new FormControl(this.empObj.email, [Validators.required]),
      address: new FormControl(this.empObj.address),
      pin: new FormControl(this.empObj.pin, [Validators.required, Validators.minLength(6)]),
    });
  }
  onSave() {
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData)
      this.employeeForm.controls['empid'].setValue(parseData.length + 1);
      this.empList.unshift(this.employeeForm.value);
    } else {
      this.empList.unshift(this.employeeForm.value);
    }
    localStorage.setItem('EmpData', JSON.stringify(this.empList));
  }
  onEdit(emmployee: Employee) {
    debugger;
    this.empObj = emmployee;
    this.createForm();
  }

  onUpdate() {
    const record = this.empList.find(m => m.empid = this.employeeForm.controls['empid'].value);
    if (record != undefined) {
      record.empName = this.employeeForm.controls['empName'].value;
      record.address = this.employeeForm.controls['address'].value;
      record.email = this.employeeForm.controls['email'].value;
      record.contact = this.employeeForm.controls['contact'].value;
      record.pin = this.employeeForm.controls['pin'].value;
    }
    localStorage.setItem('EmpData', JSON.stringify(this.empList));
    this.reset();
  }

  onDelete(id: number) {
    debugger;
    const isDelete = confirm("Are you sure to wanted to delete?");
    if (isDelete) {
      const index = this.empList.findIndex(e => e.empid = id);
      this.empList.splice(index, 1);
      localStorage.setItem('EmpData', JSON.stringify(this.empList));
    }
  }

  reset(){
    this.empObj = new Employee();
    this.createForm();

  }
}
