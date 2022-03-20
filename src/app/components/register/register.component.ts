import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName!: string
  firstname!: string
  lastname!: string;
  password!: string;
  birthdate!: string;
  address!: string;
  role!: string;
  message!: string;

  constructor(private RegisterService: RegisterService, private readonly router: Router) { 
    const newUser= {} as User;

  }

  ngOnInit(): void {

  }
  submitUser(){
    this.message="";
    if(this.validateForm()){
      const newUser= {} as User;
      newUser.userName=this.userName;
      newUser.firstname=this.firstname;
      newUser.lastname=this.lastname;
      newUser.password=this.password;
      newUser.birthdate=this.birthdate;
      newUser.address=this.address;
      newUser.role=this.role;
      this.RegisterService.addNewUser(newUser).subscribe((result)=>{
      this.message='Added Successfully'
      })
      this.router.navigate(['/login']);
    }
  }
validateForm() {
  let answer = true;
  if(!this.userName ){
    this.message="Enter username"
    answer = false;
  }
  else if(!this.firstname){
    this.message="Enter firstname"
    answer=false
  }
  else if(!this.lastname){
    this.message="Enter lastname"
    answer=false
  }
  else if(!this.password){
    this.message="Enter password"
    answer=false
  }
  else if(!this.birthdate){
    this.message="Enter birthdate"
    answer=false
  }
  else if(!this.address){
    this.message="Enter address"
    answer=false
  }
  else if(!this.role){
    this.message="Enter role"
    answer=false
  }
  return answer
}
resetMessage(){
  this.message=""
}
}