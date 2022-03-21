import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { EditUserService } from 'src/app/services/edit-user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  currentUser= {} as User;
  // userName!: string
  firstname!: string
  lastname!: string;
  password!: string;
  birthdate!: string;
  address!: string;
  role!: string;  
  message!: string;

  constructor(private EditUserService: EditUserService, private readonly router: Router) {
  }
  
  ngOnInit(): void {
    this.EditUserService.getUser(0).subscribe((result)=>{
      this.currentUser = result;
      this.firstname = this.currentUser.firstName;
      this.lastname = this.currentUser.lastName;
      this.password = this.currentUser.password;
      this.birthdate = this.currentUser.birthDate;
      this.address = this.currentUser.address;
      this.role = this.currentUser.role;
    }) 
  }
  submitChanges(){
    this.message="";
    if(this.validateForm()){
      this.currentUser.firstName = this.firstname;
      this.currentUser.lastName = this.lastname;
      this.currentUser.password = this.password;
      this.currentUser.birthDate = this.birthdate;
      this.currentUser.address = this.address;
      this.currentUser.role = this.role;
      console.log(this.currentUser);
      this.EditUserService.editUser(this.currentUser).subscribe((result)=>{
      })
      this.router.navigate(['/home']);
    }
  }

  validateForm() {
    let answer = true;
    if(!this.firstname){
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

  cancelChanges(){
    this.router.navigate(['/home']);
  }
}
