import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from '../users.model';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  
  allUsers:UserSchema[]=[]
  page:number = 1;
  count:number = 0;
  tableSize:number = 5;

  constructor(private api:ApiService){

  }

  // when UsersListComponent page is open call getUserList()
  ngOnInit(): void {
    this.getUserList()
  }

  getUserList(){
  //  when Users List page open, display all users list from json file by making an api call : http://localhost:3000/users
    this.api.getalluser().subscribe({
      next:(result:any)=>{
        console.log(result);
        this.allUsers = result
        
      },
      error:(result:any)=>{
        console.log(result);
        console.log("Error while fetching data ... Please try after some time !!!!");

        
      }
    })
  }
 

  // Delete user
  deleteUser(id:any){
    this.api.deleteuser(id).subscribe({
      next:(res:any)=>{
        console.log("Deleted Successfully");
        this.getUserList()
      },
      error:(err:any)=>{
        console.log(err);
        alert("Network issue....Try again later !!!")
        
      }
    })
  }

  // Sort Id
  sortById(){
    this.allUsers.sort((a:any,b:any)=>a.id-b.id)
  }

  // Sort name
  sortByName(){
    this.allUsers.sort((a:any,b:any)=>a["name"].localeCompare(b["name"]))
  }
  

  // Generate pdf
  generatePDF(){
    let pdf = new jspdf
    let head = [["User Id","User Name","Email","Status"]]
    let body:any = []
    this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.active])
    })
    pdf.setFontSize(16)
    pdf.text("Employee List",10,10)
    autoTable(pdf,{head,body})
    pdf.output("dataurlnewwindow")
    pdf.save("allusers.pdf")
  }
}
