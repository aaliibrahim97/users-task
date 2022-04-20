import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,private _snackBar: MatSnackBar,private router:Router) { }

  ngOnInit(): void {}

  loading:boolean = false

  errMsg!:string 

  userData:AuthResponse[] = []

  token:string = "null"

  userId!:number

  userName!:string

  userEmail!:string

  logIn(f:NgForm) {

    this.loading = true

    let data = f.value    
    
    this.auth.doLogIn(data.email,data.password).subscribe((data:AuthResponse) => {
    
      this.loading = false

      console.log("data",data)

      this.userData.pop()

      this.userData.push(data)

      if(data.code == 1) {
        
        this.loading = false

        this.errMsg = data.message as string
      
        this._snackBar.open(this.errMsg, "", {
          
          panelClass: "alert-danger",
          
          duration: 3000

        });

      }

      else {
        
        this.token = this.userData[0].data?.Token as string
        localStorage.setItem("token",this.token)
     
        this.userId = this.userData[0].data?.Id as number
        localStorage.setItem("userId",this.userId.toString())

        this.userName = this.userData[0].data?.Name as string
        localStorage.setItem("userName",this.userName)

        this.userEmail = this.userData[0].data?.Email as string
        localStorage.setItem("userEmail",this.userEmail)
        
        if(this.token !== "null") 
        
        {
        
          this.router.navigate(['/'])

        }

      }
    },

    error => {

      //ERROR

    })
    
  }
  
}
