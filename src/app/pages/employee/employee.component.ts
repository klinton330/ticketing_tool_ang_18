import { Component, inject } from '@angular/core';
import { MasterService } from '../../master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  masterService = inject(MasterService);
  deptList?: any[] = [];
  gridList?: any[] = [];
  roleList?:any[]=[];
  isNewView:boolean=false;
  newObj: any = {
    "employeeId":0,
    "employeeName": "",
    "contactNo": "",
    "emailId":"",
    "deptId":0,
    "password":"",
    "gender":"",
    "role":""
  };
  ngOnInit(): void {
    this.getAllGridData();
    this.getAllDept();
    this.getAllRoles();
  }

  getAllDept(){
    this.masterService.getAllDept().subscribe({
      next:(data:any)=>{
        this.deptList=data.data;
      },
      error:(error:any)=>{
        alert("Error in Fetching department")
      }

    })
  }
  getAllRoles(){
    console.log("getALLrOLES")
    this.masterService.getAllRoles().subscribe({
      next:(data:any)=>{
        console.log(data.data)
        this.roleList=data.data;
      },
      error:(error:any)=>{
        alert("Error in Fetching department")
      }

    })
  }
  getAllGridData() {
    return this.masterService.getAllEmployee().subscribe((data: any) => {
      this.gridList = data.data;
      console.log(this.gridList);
    });
  }

  createEmployee() {

  console.log(this.newObj)
    this.masterService.createNewEmployee(this.newObj).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.result) {
          alert('Employee Created Successfully');
          this.getAllGridData();
        } else {
          alert(data.message);
        }
      },
      error: (error: any) => {
        alert(error);
      },
    });
  }

updateNewEmployee(){

  this.isNewView=!this.isNewView
  this.newObj=  {
    "employeeId":0,
    "employeeName": "",
    "contactNo": "",
    "emailId":"",
    "deptId":0,
    "password":"",
    "gender":"",
    "role":""
  };
}
  onEdit(data: any) {
    this.newObj = data;
    console.log(data)
    this.isNewView=!this.isNewView
  }

  updateEmployee() {
    console.log(this.newObj.gender)
    this.masterService.updateEmployee(this.newObj).subscribe({
      next: (data: any) => {
        if (data.result) {
          alert('Employee Updated Successfully');
          this.getAllGridData();
        } else {
          
          alert(data.message);
        }
      },
      error: (error: any) => {
        console.log(error)
        alert(error);
      },
    });
  }

  onDelete(id: any) {
    const isDelete = confirm('Are you sure You want to delete?');
    if (isDelete) {
      this.masterService.deleteEmployee(id).subscribe({
        next: (data: any) => {
          if (data.result) {
            alert('Employee deleted successfully');
            this.getAllGridData();
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
