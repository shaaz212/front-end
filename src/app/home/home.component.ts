import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  adminName:string=""
  totalUserCount:number=0

  constructor(private api:ApiService){

  }

  
  ngOnInit(): void {
    if (localStorage.getItem("admin_name")) {
      this.adminName = localStorage.getItem("admin_name") || ""
    }
    this.totalEmployee()
  }

  // updateAdminName
  updateAdminName(event:any){
    console.log(event);
    this.adminName = event
    
  }

  // totalEmployee
  totalEmployee(){
    this.api.getalluser().subscribe((res:any)=>{
      console.log(res);
      this.totalUserCount = res.length
      
    })
  }

}
