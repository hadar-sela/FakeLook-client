import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private http:HttpClient) { }

  addNewPost(post: Post): Observable<Post>
  {
    let httpOptions ={
      headers: new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.post<Post>(environment.postsUrl,post,httpOptions);
  }
}
