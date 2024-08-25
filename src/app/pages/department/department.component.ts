import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../master.service';
import { Department } from '../../model/Department';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit {
  masterService = inject(MasterService);
  deptList?: Department[] = [];
  newDept: any = {
    deptId: 0,
    deptName: '',
    createdDate: '',
  };
  ngOnInit(): void {
    this.getAllDept();
  }

  getAllDept() {
    return this.masterService.getAllDept().subscribe((data: any) => {
      this.deptList = data.data;
      console.log(this.deptList);
    });
  }

  createDept() {
    console.log(this.newDept);
    this.masterService.createNewDept(this.newDept).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.result) {
          alert('Department Created Successfully');
          this.getAllDept();
        } else {
          alert(data.message);
        }
      },
      error: (error: any) => {
        alert(error);
      },
    });
  }

  onEdit(data: any) {
    this.newDept = data;
  }

  updateDept() {
    console.log("Depar",this.newDept)
    this.masterService.updateDept(this.newDept).subscribe({
      next: (data: any) => {
        if (data.result) {
          alert('Department Updated Successfully');
          this.getAllDept();
        } else {
          alert(data.message);
        }
      },
      error: (error: any) => {
        alert(error);
      },
    });
  }

  onDelete(id: any) {
    const isDelete = confirm('Are you sure You want to delete?');
    if (isDelete) {
      this.masterService.deleteDeptById(id).subscribe({
        next: (data: any) => {
          if (data.result) {
            alert('Department deleted successfully');
            this.getAllDept()
          } else {
            alert(data.message);
          }
        },
        error: (error: any) => {
          alert(error);
        },
      });
    }
  }
}
