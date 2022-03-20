import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AddPostService } from 'src/app/services/add-post.service';
import { RouterServiceService } from 'src/app/services/router-service.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  post= {} as Post;
  answer!: boolean;
  message: string ="";
  imgFile?: File;
  imgSrc=""
  constructor(private AddPostService: AddPostService, private readonly router: Router,private dialog: MatDialog,private routerService: RouterServiceService) { 

  }

  ngOnInit(): void {
  }
  addpostdb(answer: boolean)
  {
      const newPost= {} as Post;
      if(this.valid()){
        newPost.description=this.post.description;
        newPost.imageSorce=this.imgSrc;
          this.AddPostService.addNewPost(newPost).subscribe((result)=>{
            this.routerService.postChanged(true);
         this.dialog.closeAll();

          },(error)=>{
            if(error.status==401){
              this.router.navigate(['/login']);
              localStorage.clear();
              this.dialog.closeAll();
            }
            else{
              this.message = error.error.detail
            }
          })
      }
  }
  valid(){
    let answer = true;
    if(!this.post.description){
      this.message="Enter description"
      answer = false;
    }
    else if(!this.imgSrc){
      this.message="Enter imagesorce"
      answer=false
    }
    return answer
  }
  showFilePreview(event: any) {
    console.log('here');
    this.imgFile = event.target.files[0];
    if (this.imgFile) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
        console.log(this.imgSrc);
      };
      reader.readAsDataURL(this.imgFile);
    }
  }
}
