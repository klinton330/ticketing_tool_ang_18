import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl:string="https://freeapi.gerasim.in/api/TicketsNew/"
  constructor(private http:HttpClient) { }

  login(obj:any){
    return this.http.post(this.apiUrl+"Login",obj)
  }

  getAllDept(){
    return this.http.get(`${this.apiUrl}GetDepartments`)
  }

  createNewDept(obj:any){
    return this.http.post(`${this.apiUrl}CreateDepartment`,obj)
  }

  updateDept(obj:any){
    return this.http.put(`${this.apiUrl}UpdateDepartment`,obj)
  }

  deleteDeptById(id:number){
    return this.http.delete(`${this.apiUrl}DeleteDepartment?id=${id}`)
  }


  getpCategory(){
    return this.http.get(`${this.apiUrl}GetParentCategory`)
  }

  createNewpCategory(obj:any){
    return this.http.post(`${this.apiUrl}CreateParentCategory`,obj)
  }

  updatepCategory(obj:any){
    return this.http.put(`${this.apiUrl}UpdateParentCategory`,obj)
  }

  deletepCategoryById(id:number){
    return this.http.delete(`${this.apiUrl}DeleteParentCategory?id=${id}`)
  }
  getChildCategory(){
    return this.http.get(`${this.apiUrl}GetChildCategory`)
  }

  createNewChildCategory(obj:any){
    return this.http.post(`${this.apiUrl}CreateChildCategory`,obj)
  }
  updateChildCategory(obj:any){
    return this.http.put(`${this.apiUrl}UpdateChildCategory`,obj)
  }
  deleteChildCategoryById(id:number){
    return this.http.delete(`${this.apiUrl}DeleteChildCategory?id=${id}`)
  }

  getAllRoles() {
    return this.http.get(`${this.apiUrl}GetAllRoles`)
  }
  getAllEmployee() {
    return this.http.get(`${this.apiUrl}GetEmployees`)
  }
  createNewEmployee(obj:any){
    return this.http.post(`${this.apiUrl}CreateEmployee`,obj)
  }
  updateEmployee(obj:any){
    console.log(obj)
    return this.http.put(`${this.apiUrl}UpdateEmployee`,obj)
  }
  deleteEmployee(id:number){
    alert(id)
    return this.http.delete(`${this.apiUrl}DeleteEmployee?id=${id}`)
  }
  createNewTicket(obj:any){
    console.log(obj)
    return this.http.post(`${this.apiUrl}CreateNewTicket`,obj)
  }

  getTicketCreatedByLoggedEmp(empId:any){
    return this.http.get(`${this.apiUrl}GetTicketsCreatedByEmpId?empId=${empId}`)
  }

  getTicketAssignedToEmp(empId:any){
    return this.http.get(`${this.apiUrl}GetAssignedTicketsByEmpId?empId=${empId}`)
  }

  startTicket(ticketId:any){
    return this.http.post(`${this.apiUrl}startTicket?id=${ticketId}`,{})
  }
  closeTicket(ticketId:any){
    return this.http.post(`${this.apiUrl}closeTicket?id=${ticketId}`,{})
  }
}
