import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Data } from 'src/app/interfaces/data';
import { Store, select } from '@ngrx/store';

import * as userActions from "../state/user.actions"
import * as fromUser from "../state/user.reducer"
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
        private store:Store<fromUser.AppState>,
    private _snackBar: MatSnackBar) {}

    id:string | undefined= ''
    error$!: Observable<String>;
    success$!: Observable<boolean>
    errorMessage!:string
    state: Subscription = new Subscription();

  ngOnInit(): void {
  
    this.id = this.data.id as string

  }
  
  //Submit delete data
  submit(){

    const deletedUser: Data = {
      id: this.id
    }

    this.store.dispatch(new userActions.DeleteUser(deletedUser));

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

        this._snackBar.open("Deleted Successfully", "", {

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
