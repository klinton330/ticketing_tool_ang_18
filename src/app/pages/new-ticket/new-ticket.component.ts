import { Component, inject } from '@angular/core';
import { Department } from '../../model/Department';
import { MasterService } from '../../master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  masterService = inject(MasterService);
  deptList?: Department[] = [];
  parentCategoryList?: any=[];
  filterchildCategory?:any=[];
  childCategoryList?:any=[];
  selectedParentCategory:string='';
  newTicketObj:any={
    employeeId: 0,
    severity: "",
    childCategoryId: 0,
    deptId: 0,
    requestDetails: ""
  }
  ngOnInit(): void {
    const loggedUserData=localStorage.getItem('ticketUser')
      if(loggedUserData!=null){
        const userData=JSON.parse(loggedUserData);
        this.newTicketObj.employeeId=userData.employeeId;
      }
    this.getAllDept();
    this.getAllPcategory();
    this.getChildCategory();
  }
  getAllDept() {
    return this.masterService.getAllDept().subscribe((data: any) => {
      this.deptList = data.data;
      console.log(this.deptList);
    });
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
  
  getChildCategory() {
       this.masterService.getChildCategory().subscribe({
        next:(data:any)=>{
          this.childCategoryList=data.data;
        },
        error:(error:any)=>{
          alert(error)
        }
        
      })
   }

   onParenetCategoryChange(){
     this.filterchildCategory=this.childCategoryList.filter((x: { parentCategoryName: string; })=>x.parentCategoryName==this.selectedParentCategory)
   }

   createNewTicket(){
    console.log("New Ticket Obj:",this.newTicketObj)
    this.masterService.createNewTicket(this.newTicketObj).subscribe({
      next:(data:any)=>{
        console.log(data);
        if (data.result) {
          alert('New Ticket Created Successfully');
        } else {
          alert(data.message);
        }
      },
      error:(error:any)=>{
        alert(error)
      }
    })
   }

  
}
