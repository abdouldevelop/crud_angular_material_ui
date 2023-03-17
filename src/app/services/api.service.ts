import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient ) { }

  postInscription(data : any){
    return this.http.post<any>("http://localhost:3000/inscriptions/",data);
  }

  getInscription(){
  return this.http.get<any>("http://localhost:3000/inscriptions/")
  }
  putInscription(data:any,id: number){
    return this.http.put<any>("http://localhost:3000/inscriptions/"+id,data)
  }
  deleInscription(id:number){
    return this.http.delete<any>("http://localhost:3000/inscriptions/"+id)
  }
}
