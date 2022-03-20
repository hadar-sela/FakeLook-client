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

  list! : Post[]
  constructor(private postService: PostService,private readonly router: Router,private routerService: RouterServiceService) { }

  ngOnInit(): void {
    console.log('here')
    this.routerService.postChange.subscribe((event)=>{
      if(event){
        this.initList();
      }
    })

    this.initList();
  }
  initList() {
    console.log('here')
    this.postService.getAllPosts().subscribe((result)=>{
      console.log(result);
      this.list=result;
    },(error)=>{
      if(error.status==401){
        this.router.navigate(['/login']);
        localStorage.clear();
      }
    })
}
}
  
