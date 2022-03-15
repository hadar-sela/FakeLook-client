import { Component, OnInit } from '@angular/core';
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

  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    console.log("You enter the username:");
    console.log(this.username);
    console.log("You enter the password:")
    console.log(this.password);
    this.LoginService.getUser(this.username).subscribe((result)=>{
      console.log(result);
      if(!result){
        this.message = "Incorrect username or password";
      }
      if(result.password != this.password){
        this.message = "Incorrect username or password";
      }
      else{
        this.message = "";
      }
      
    })
  }
}
