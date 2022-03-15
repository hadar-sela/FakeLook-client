import { Component, OnInit } from '@angular/core';
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

  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    const newUser= {} as User;
    newUser.username=this.username;
    newUser.password=this.password;
    this.LoginService.getUser(newUser).subscribe((result)=>{
      console.log(result);      
    })
  }
}
