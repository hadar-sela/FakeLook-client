import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(private http:HttpClient) { }

  editUser(user: User): Observable<User>
  {
    let httpOptions ={
      headers: new HttpHeaders({'Content-Type':'application/json','Authorization' : 'Bearer ' + localStorage.getItem('token')})
    }
    const params = new HttpParams()

    return this.http.put<User>(environment.usersUrl, user, httpOptions);
  }
  getUser(id: number): Observable<any>
  {
    let httpOptions ={
      headers: new HttpHeaders({'Content-Type':'application/json','Authorization' : 'Bearer ' + localStorage.getItem('token')})
    }
    return this.http.get<User>(environment.usersUrl + "/" + id, httpOptions);
  }
}
