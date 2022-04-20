import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';

import * as userActions from "../state/user.actions"
import * as fromUser from "../state/user.reducer"

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserAddComponent>, private store: Store<fromUser.AppState>, private _snackBar: MatSnackBar) { }

  error$!: Observable<string>;
  success$!: Observable<boolean>
  errorMessage!: string
  state: Subscription = new Subscription();

  ngOnInit(): void { }


  //Submit create user
  createUser(f: NgForm) {

    this.errorMessage = ""

    let data = f.value

    this.store.dispatch(new userActions.AddUser(data));

    const state = this.store.pipe(select(fromUser.getState))
    
    this.state = state.subscribe((state: any) => {

      
      if (state.error != "" && state.error!=="null") {

        this.errorMessage = state.error.error.Message

        this._snackBar.open(this.errorMessage, "", {

          panelClass: "alert-danger",

          duration: 3000

        });

      
      } 
      
      else if (state.error == "null") {

        this.dialogRef.close();

        this._snackBar.open("Added Successfully", "", {

          panelClass: "alert-success",

          duration: 3000

        });
      }

    })

    this.dialogRef.afterClosed().subscribe(()=> {
      this.state.unsubscribe()
    })

  }

  ngOnDestory(){
    this.state.unsubscribe()
  }

}
