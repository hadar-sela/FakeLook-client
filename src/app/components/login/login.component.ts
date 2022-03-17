import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  message: string ="";

  constructor(private LoginService: LoginService, private readonly router: Router) { }

  ngOnInit(): void {
    this.checkIfLogin();
  }
  checkIfLogin(){
    if(localStorage.getItem("token")){
      this.router.navigate(['/home']);
    }
  }

  login(){
    const newUser= {} as User;
    if(this.valid())
    {
      newUser.username = this.username;
      newUser.password = this.password;
      this.LoginService.getUser(newUser).subscribe((result)=>{
      if(result){
        localStorage.setItem("token",result.token);
        this.message = "";
        this.router.navigate(['/home']);
      }
    },(error)=>{
     this.message = error.error.detail
     
    })
    }
  }
  valid(){
    let answer = true;
    if(!this.username ){
      this.message="Enter User Name"
      answer = false;
    }
    else if(!this.password){
      this.message="Enter password"
      answer=false
    }
    return answer
  }
  signUp(){
    this.router.navigate(['/register']);
  }
}
