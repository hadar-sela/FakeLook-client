import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http:HttpClient) { }

  getUserbirth(user: User): Observable<any>{
    return this.http.post<any>((environment.usersUrl + "/forgotpassword"), user);
    
  }
}
