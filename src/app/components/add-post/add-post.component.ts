import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AddPostService } from 'src/app/services/add-post.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  posttext!:string;

  constructor(private AddPostService: AddPostService, private readonly router: Router) { }

  ngOnInit(): void {
  }
  addpostdb()
  {
      const newPost= {} as Post;
      newPost.posttext=this.posttext;
      this.AddPostService.addNewPost(newPost).subscribe((result)=>{
        console.log(result)
        })
  
  }
}
