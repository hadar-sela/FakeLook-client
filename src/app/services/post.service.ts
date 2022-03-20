import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  
  constructor(private http:HttpClient) { }

  getAllPosts():Observable<Post[]>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<Post[]>(environment.postsUrl,{headers})
    // return this.http.get<Post[]>(environment.postsUrl)
  }

}
