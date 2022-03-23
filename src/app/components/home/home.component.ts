import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AddPostComponent } from '../add-post/add-post.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addPostPopUp: boolean;
  mapActive :boolean
  constructor(private readonly router: Router ,private postService:PostService,public dialog: MatDialog) {
    this.addPostPopUp=false;
    this.mapActive=true
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
    this.dialog.open(AddPostComponent);
  }
  filter(){
    this.dialog.open(FilterComponent);
  }

  activeMap(selection:any){
    console.log(selection)
    if(selection.index==0)
    this.mapActive=true
    else 
    this.mapActive =false
  }
  LogOut(){
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  EditUser(){
    //TO-DO 
    //Token validation
    this.router.navigate(['/edit-user']);
  }
  
  
}
