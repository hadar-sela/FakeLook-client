import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { ForgotpasswordService } from 'src/app/services/forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  userName!: string
  birthdate!: string
  message: string ="";


  constructor(private _snackBar: MatSnackBar,private forgotpasswordService:ForgotpasswordService,private readonly router: Router) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    const newUser= {} as User;
    if(this.valid())
    {
     newUser.userName=this.userName;
     newUser.birthDate=this.birthdate;
     this.forgotpasswordService.getUserbirth(newUser).subscribe((result)=>{
      this._snackBar.open("Your password is: " +result.password,"Dismiss",{
        duration:3000
      
      });
      //this.router.navigate(['/login']);
    },(error)=>{
     this.message = error.error.detail
     
    })
    }
  }
  valid(){
    let answer = true;
    if(!this.userName ){
      this.message="Enter User Name"
      answer = false;
    }
    else if(!this.birthdate){
      this.message="Enter birthdate"
      answer=false
    }
    return answer
  }
  returnlogin(){
    this.router.navigate(['/login']);
  }
}
