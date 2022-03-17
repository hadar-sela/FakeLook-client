import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addPostPopUp: boolean;
  constructor(private readonly router: Router ,private postService:PostService) {
    this.addPostPopUp=false;
   }
  
  ngOnInit(): void {
    this.initPosts()
  }
  initPosts() {
    this.postService.getAllPosts().subscribe((result)=>{
      console.log(result)
    },(error)=>{
      if(error.status==401){
        this.router.navigate(['/login']);
        localStorage.clear();
      }
    })
  }
  addPost(){
    // this.router.navigate(['/add-post']);
    this.addPostPopUp=!this.addPostPopUp
  }

}
