import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  getUser(user: User): Observable<User>{
    //const url = environment.usersUrl + "/GetByUsername/" + username;
    //return this.http.get<User>(url);
    return this.http.post<User>(environment.usersUrl+'/Login',user)
  }

}
