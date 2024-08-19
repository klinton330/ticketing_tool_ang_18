import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-child-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './child-category.component.html',
  styleUrl: './child-category.component.css'
})
export class ChildCategoryComponent {
  masterService = inject(MasterService);
 parentCategoryList:any[]=[];
 gridList?: any[] = [];
  newObj: any = {
    "childCategoryId": 0,
    "categoryName": "",
    "parentCategoryId": ""
  };
  ngOnInit(): void {
    this.getAllGridData();
    this.getAllPcategory();
  }
  getAllPcategory() {
    this.masterService.getpCategory().subscribe({
      next:(data:any)=>{
        this.parentCategoryList=data.data;
      },
      error:(error:any)=>{
        alert(error)
      }
      
    })
  }

  getAllGridData() {
   /* this.masterService.getAllDept().subscribe({
      next:(data:any)=>{
        this.deptList=data.data;
      },
      error:(error:any)=>{
        alert("Error in Fetching department")
      }

    })*/
    return this.masterService.getChildCategory().subscribe((data: any) => {
      this.gridList = data.data;
      console.log(this.gridList);
    });
  }

  createChild() {
    console.log(this.newObj);
    this.masterService.createNewChildCategory(this.newObj).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.result) {
          alert('Child Category Created Successfully');
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

  updateChild() {
    this.masterService.updateChildCategory(this.newObj).subscribe({
      next: (data: any) => {
        if (data.result) {
          alert('Child Category Updated Successfully');
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
      this.masterService.deleteChildCategoryById(id).subscribe({
        next: (data: any) => {
          if (data.result) {
            alert('Child Category deleted successfully');
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
