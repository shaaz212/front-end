import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // property
  email:string=""
  password:string=""

  constructor(private api:ApiService,private loginRouter:Router){

  }
  
  login(){
    if(this.email && this.password){
      // compare username and password with admin details
      // for that we should get admin details from http://localhost:3000/users/1
      // for that we have to make an api call to http://localhost:3000/users/1
      this.api.adminDetails().subscribe({
        next:(result:any)=>{
          console.log(result);
          // compare username and password with admin details
          if (this.email==result.email && this.password==result.password) {
            // save details in local storage
            localStorage.setItem("admin_name",result.name)
            localStorage.setItem("admin_pswd",result.password)
            console.log("Authorization Successfull");
            
            // navigate to home page - use by navigateByUrl - Router class
            this.loginRouter.navigateByUrl('home')
          } else {
            alert("Invalid Credentials !!!")
          }
          
        },
        error:(result:any)=>{
          console.log(result);
          console.log("Error while fetching data ... Please try after some time !!!!");
          
          
        }
      })
    }else{
      alert("Please fill the form completely !!!!")
    }
  }
  
}
