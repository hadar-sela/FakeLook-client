import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private postService: PostService,private readonly router: Router,private routerService: RouterServiceService) { 
    this.countLike=[]
    this.ispostlike=[]
  }

  ngOnInit(): void {
    this.routerService.postChange.subscribe((event)=>{
      if(event){
        this.initList();
        this.initlikepostnumber();
        this.initLikedPost();
        
      }
    })

    this.initList();
  }
  initLikedPost() {
    var currId = localStorage.getItem('id');
    for (var i = 0; i < this.list.length; i++) {
      for (var j = 0; j < this.list[i].likes.length; j++) {
        if (
          this.list[i].likes[j].user.id == currId &&
          this.list[i].likes[j].isActive
        ) {
          this.ispostlike[i] = true;
        } else {
          this.ispostlike[i] = false;
        }
      }
    } 
    console.log(this.ispostlike)
  }
  initList() {
    this.postService.getAllPosts().subscribe((result)=>{
      console.log(result);
      this.list=result;
      this.initlikepostnumber();
      this.initLikedPost();


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
  })
}
// addLike(id:number){
//   this.postService.addLike(id).subscribe((result)=>{
//     console.log(result)
//     for(var i=0; i<this.list.length; i++){
//       if(this.list[i].id==result.id){
//         console.log(this.list[i])
//         if(result.isActive){
//           this.countLike[i]++;
//         }
//       }
//     }
//   })
// }
}
  
