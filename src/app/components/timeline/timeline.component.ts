import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { RouterServiceService } from 'src/app/services/router-service.service';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  list! : any[]
  countLike: number[]
  ispostlike: boolean[]
  listcomment!: any[]
  arraycomment!: any[]
  newpost!: string
  showComments:boolean[]=[]
  shownewComments:boolean[]=[]

  constructor(private _snackBar: MatSnackBar,private postService: PostService,private readonly router: Router,private routerService: RouterServiceService) { 
    this.countLike=[]
    this.ispostlike=[]
   
  }

  ngOnInit(): void {
    this.filterListener()
    this.routerService.postChange.subscribe((event)=>{
      if(event){
        this.initList();
        this.initlikepostnumber();
        this.initLikedPost();

      }
    })
    this.initList();
    // for 0 -> list.length
    // comment. (list[i].comment)
  }
  filterListener() {
    this.routerService.filterChange.subscribe((event)=>{
      this.list=event
    })
  }


  initLikedPost() {
    var currId = localStorage.getItem('id');
    for (var i = 0; i < this.list.length; i++) {
      this.ispostlike[i] = false;
      this.showComments[i]=false
      this.shownewComments[i]=false;
      for (var j = 0; j < this.list[i].likes.length; j++) {
        if (
          this.list[i].likes[j].user.id == currId &&
          this.list[i].likes[j].isActive
        ) {
          this.ispostlike[i] = true;
        } 
      }
    } 

  }
  initList() {
    this.postService.getAllPosts().subscribe((result)=>{
      console.log(result);
      this.list=result;
      this.initlikepostnumber();
      this.initLikedPost();
      this.list.reverse();
      this.ispostlike.reverse();
      this.countLike.reverse();
    },(error)=>{
      if(error.status==401){
        this.router.navigate(['/login']);
        localStorage.clear();
      }
    })
}
initlikepostnumber(){
  for(var i=0; i<this.list.length; i++)
  {
    var postlike=0;
    for(var j=0; j<this.list[i].likes.length; j++){
      if(this.list[i].likes[j].isActive){
        postlike++;
      }
    }
    this.countLike[i]=postlike
  }
}

addLike(id:number){
  this.postService.addLike(id).subscribe((result)=>{
    console.log(result)
    for(var i=0; i<this.list.length; i++){
      if(this.list[i].id==result.postId){
        if(result.isActive){
          this.countLike[i] =  this.countLike[i]+1;
          this.ispostlike[i] = true;
        }
        else{
          this.countLike[i] =  this.countLike[i]-1;
          this.ispostlike[i] = false;
        }
      }
  
    }
  })
}

getcomment(id: number){

  this.showComments[id]=!this.showComments[id]
  
}
writePost(id: number){
this.shownewComments[id]=!this.shownewComments[id]
}
addComment(id: number){
  this.postService.addcomment(id,this.newpost).subscribe((result)=>{
    console.log(result)
    this._snackBar.open("comment published","Dismiss",{
      duration:3000
    
    });
    this.initList();
    this.newpost=""
  })
}
}
  
