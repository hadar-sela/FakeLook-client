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
  }

  login(){
    const newUser= {} as User;
    newUser.username = this.username;
    newUser.password = this.password;
    console.log("You enter the username:");
    console.log(this.username);
    console.log("You enter the password:")
    console.log(this.password);
    this.LoginService.getUser(newUser).subscribe((result)=>{
      console.log(result);
      if(!result){
        this.message = "Incorrect username or password";
      }
      else{
        this.message = "";
      }
    })
  }

  signUp(){
    this.router.navigate(['/register']);
  }
}
