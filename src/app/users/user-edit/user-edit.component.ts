import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Data } from 'src/app/interfaces/data';
import { Store, select } from '@ngrx/store';

import * as userActions from "../state/user.actions"
import * as fromUser from "../state/user.reducer"
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private store:Store<fromUser.AppState>,
    private _snackBar: MatSnackBar) {}
    
    id:string | undefined= ''
    email:string | undefined= ''
    name:string | undefined = ''
    location:string | undefined = ''
    Msg:string ="Edited Successd"
    error$!: Observable<String>;
    success$!: Observable<boolean>
    errorMessage!:string
    state: Subscription = new Subscription();

  ngOnInit(): void {
    this.id = this.data.id as string
    this.email = this.data.email as string
    this.name = this.data.name as string
    this.location = this.data.location as string
  }
  
  //Submit edit user
  submit() {    

    const updatedUser: Data = {
      id: this.id,
      name: this.name,
      email: this.email,
      location: this.location,
    }

    this.store.dispatch(new userActions.EditUser(updatedUser));

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

        this._snackBar.open("Updated Successfully", "", {

          panelClass: "alert-success",

          duration: 3000

        });
      }

    })

    this.dialogRef.afterClosed().subscribe(()=> {
      this.state.unsubscribe()
    })

  }
}
