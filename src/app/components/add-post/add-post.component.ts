import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AddPostService } from 'src/app/services/add-post.service';
import { RouterServiceService } from 'src/app/services/router-service.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';


export interface Tag {
  content: string;
}

export interface UserTag {
  userId: number;
}


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
  currXPos: number = 0;
  currYPos: number = 0;
  currZPos: number | null = 0;


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  usersFromDB: User[] = [];
  userNames: string[] = [];
  userTagged: string[] = [];
  userTaggedToDB: UserTag[] = [];
  tags: any[] = [];
  userCtrl = new FormControl();
  filteredUsers: Observable<string[]>;

  constructor(private AddPostService: AddPostService, private readonly router: Router,private dialog: MatDialog,private routerService: RouterServiceService) { 
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => (user ? this._filter(user) : this.userNames.slice())),
    );
  }

  ngOnInit(): void {
    this.initUsers();
  }

  addpostdb(answer: boolean)
  {
      const newPost= {} as Post;
      if(this.valid()){
        newPost.description=this.post.description;
        newPost.imageSorce=this.imgSrc;
        // navigator.geolocation.watchPosition((data) => {
        //   newPost.x_Position= data.coords.longitude;
        //   newPost.y_Position = data.coords.latitude;
        //   newPost.z_Position = 32.0852999;
        // });
        newPost.x_Position= 31.0461;
        newPost.y_Position = 34.8516;
        newPost.z_Position = 32;
        newPost.tags = this.tags; 
        newPost.userTaggedPost = this.userTaggedToDB;       

      this.AddPostService.addNewPost(newPost).subscribe((result)=>{
        this.routerService.postChanged(true);
        this.dialog.closeAll();
        console.log(result);

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

  initUsers(){
    this.AddPostService.getUsers().subscribe((result)=>{
      for (let index = 0; index < result.length; index++) {
        this.userNames.push(result[index].userName);
        var user = {} as User;
        user.userName = result[index].userName;
        user.id = result[index].id;
        this.usersFromDB.push(user);
      }
    })
  }
  

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      let tag ={} as Tag;
      tag.content = value;
      this.tags.push({content:value});
    }
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }



  addUser(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      for (let i = 0; i < this.usersFromDB.length; i++) {
        if(value==this.usersFromDB[i].userName){
          this.userTagged.push(value);
           var userTag = {} as UserTag;
           userTag.userId = this.usersFromDB[i].id;
           this.userTaggedToDB.push(userTag);
        }       
      }
    }
    event.chipInput!.clear();
    this.userCtrl.setValue(null);
  }

  removeUser(user: string): void {
    const index = this.userTagged.indexOf(user);
    if (index >= 0) {
      this.userTagged.splice(index, 1);
      this.userTaggedToDB.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.userTagged.push(event.option.viewValue);
    for (let i = 0; i < this.usersFromDB.length; i++) {
      if(event.option.viewValue==this.usersFromDB[i].userName){
         var userTag = {} as UserTag;
         userTag.userId = this.usersFromDB[i].id;
         this.userTaggedToDB.push(userTag);
      }       
    }
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.userNames.filter(user => user.toLowerCase().includes(filterValue));
  }
}
