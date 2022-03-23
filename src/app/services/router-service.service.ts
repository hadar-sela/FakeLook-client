import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class RouterServiceService {

  postChange: BehaviorSubject<any>;
  filterChange : BehaviorSubject<any>;

  constructor() {
    this.postChange=new BehaviorSubject(false)
    this.filterChange = new BehaviorSubject([]);
   }
   postChanged(answer: boolean){
     this.postChange.next(answer);

   }

   filteChanged(list:Post[]){
     this.filterChange.next(list)
   }
  }