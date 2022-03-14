import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username!: string
  firstname!: string
  lastname!: string;
  password!: string;
  birthdate!: string;
  address!: string;
  role!: string;

  constructor(private RegisterService: RegisterService) { 
    const newUser= {} as User;

  }

  ngOnInit(): void {
    
  }
  submitUser(){
    const newUser= {} as User;
    newUser.username=this.username;
    newUser.firstname=this.firstname;
    newUser.lastname=this.lastname;
    newUser.password=this.password;
    newUser.birthdate=this.birthdate;
    newUser.address=this.address;
    newUser.role=this.role;
    this.RegisterService.addNewUser(newUser).subscribe((result)=>{
      console.log(result)
  })
}
}
