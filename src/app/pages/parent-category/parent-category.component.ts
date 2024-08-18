import { Component, inject } from '@angular/core';
import { MasterService } from '../../master.service';
import { FormsModule } from '@angular/forms';
import { Department } from '../../model/Department';

@Component({
  selector: 'app-parent-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './parent-category.component.html',
  styleUrl: './parent-category.component.css'
})
export class ParentCategoryComponent {
  masterService = inject(MasterService);
  deptList?: Department[] = [];
 gridList?: any[] = [];
  newObj: any = {
    "categoryId": 0,
    "deptName": "",
    "categoryName": "",
    "deptId":""
  };
  ngOnInit(): void {
    this.getAllGridData();
  }

  getAllGridData() {
    this.masterService.getAllDept().subscribe({
      next:(data:any)=>{
        this.deptList=data.data;
      },
      error:(error:any)=>{
        alert("Error in Fetching department")
      }

    })
    return this.masterService.getpCategory().subscribe((data: any) => {
      this.gridList = data.data;
      console.log(this.gridList);
    });
  }

  createParent() {
    console.log(this.newObj);
    this.masterService.createNewpCategory(this.newObj).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.result) {
          alert('Parent Category Created Successfully');
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

  onEdit(data: any) {
    this.newObj = data;
  }

  updateParent() {
    this.masterService.updatepCategory(this.newObj).subscribe({
      next: (data: any) => {
        if (data.result) {
          alert('Parent Category Updated Successfully');
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

  onDelete(id: any) {
    const isDelete = confirm('Are you sure You want to delete?');
    if (isDelete) {
      this.masterService.deletepCategoryById(id).subscribe({
        next: (data: any) => {
          if (data.result) {
            alert('Parent Category deleted successfully');
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
