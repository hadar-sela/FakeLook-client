import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  addNewUser(User: User): Observable<User>
  {
    let httpOptions ={
      headers: new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.post<User>(environment.usersUrl,User,httpOptions);
  }

}
