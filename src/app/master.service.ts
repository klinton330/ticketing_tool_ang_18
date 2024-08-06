import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl:string="https://freeapi.gerasim.in/api/Tickets/"
  constructor(private http:HttpClient) { }

  login(obj:any){
    return this.http.post(this.apiUrl+"Login",obj)
  }
}
