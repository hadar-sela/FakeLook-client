import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterServiceService {

  postChange: BehaviorSubject<any>;

  constructor() {
    this.postChange=new BehaviorSubject(false)
   }
   postChanged(answer: boolean){
     this.postChange.next(answer);

   }
  }