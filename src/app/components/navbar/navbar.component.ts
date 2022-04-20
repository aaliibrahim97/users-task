import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }
  
  userName!:string
  userEmail!:string
  
  ngOnInit(): void {
    this.userName = localStorage.getItem("userName") as string
    this.userEmail = localStorage.getItem("userEmail") as string
  }

  logOut() {
    localStorage.clear()    
    this.router.navigate(['/login'])
  }
}
