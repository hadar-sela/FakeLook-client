import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filter } from '../models/filter';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http:HttpClient) {

   }

  addNewFilter(filter: Filter): Observable<Post[]> {
    {
    
      let httpOptions ={
        headers: new HttpHeaders({'Content-Type':'application/json','Authorization' : 'Bearer ' + localStorage.getItem('token'),
      })
      }
      return this.http.post<Post[]>(environment.filterURL,filter,httpOptions);
  }
}
}
