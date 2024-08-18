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

}
