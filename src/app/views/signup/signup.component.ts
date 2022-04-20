import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth:AuthService,private _snackBar: MatSnackBar, private router:Router) { }

  ngOnInit(): void {}

  loading:boolean = false

  errMsg!:string 

  userData:AuthResponse[] = []

  signup(f:NgForm) {
    
    this.loading = true

    let data = f.value

    console.log(data)
    
    this.auth.doRegist(data.name,data.email,data.password).subscribe((data:AuthResponse) => {
    
      this.loading = false

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
        
        this.router.navigate(['/login'])

      }

    },

    error => {

      //ERROR

    })
    
  }

}
