import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AddPostService } from 'src/app/services/add-post.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

   post= {} as Post;
  answer!: boolean;
  @Output() answerEvent: EventEmitter<boolean>= new EventEmitter()
  
  constructor(private AddPostService: AddPostService, private readonly router: Router) { 

  }

  ngOnInit(): void {
  }
  addpostdb()
  {
      const newPost= {} as Post;
      newPost.Description=this.post.Description;
      newPost.ImageSorce=this.post.ImageSorce;
        this.AddPostService.addNewPost(newPost).subscribe((result)=>{
        console.log(result)
        },(error)=>{
          if(error.status==401){
            this.router.navigate(['/login']);
            localStorage.clear();
          }
        })
  }
}
