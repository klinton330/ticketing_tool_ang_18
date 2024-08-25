import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../master.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
})
export class TicketListComponent implements OnInit {
  mode: string = 'My Tickets';
  ticketList: any[] = [];
  masterService = inject(MasterService);
  loggedInEmpId: number = 0;

  ngOnInit(): void {
    const loggedUserData = localStorage.getItem('ticketUser');
    if (loggedUserData != null) {
      const userData = JSON.parse(loggedUserData);
      this.loggedInEmpId = userData.employeeId;
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
    if (this.mode == 'My Tickets') {
      this.masterService
        .getTicketCreatedByLoggedEmp(this.loggedInEmpId)
        .subscribe({
          next: (data: any) => {
            this.ticketList = data.data;
          },
          error: (error: any) => {},
        });
    } else {
      this.masterService.getTicketAssignedToEmp(this.loggedInEmpId).subscribe({
        next: (data: any) => {
          console.log(data)
          this.ticketList = data.data;
        },
        error: (error: any) => {},
      });
    }
  }
  changeStatus(status:string,ticketNo:any){
      if(status=='Start'){
        console.log(ticketNo)
         this.masterService.startTicket(ticketNo).subscribe({
          next:(data:any)=>{
            if(data.result){
              alert("Ticket Status Change"+this.mode)
              this.changeMode(this.mode)
            }
            else{
              alert("Error Occured")
            }
          },
          error:(error:any)=>{
            alert(error);
          }
         })
      }
      else{
        this.masterService.closeTicket(ticketNo).subscribe({
          next:(data:any)=>{
            if(data.result){
              alert("Ticket Status Change")
              this.changeMode(this.mode)
            }
            else{
              alert("Error Occured")
            }
          },
          error:(error:any)=>{
            alert(error);
          }
         })

      }
  }
}
