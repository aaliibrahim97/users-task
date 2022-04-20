import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store"
import { Observable, of } from "rxjs";
import {map, mergeMap, catchError} from "rxjs/operators"
import * as userActions from "../state/user.actions"
import { User } from "src/app/interfaces/user";
import { UserService } from "src/app/services/user.service";
import { Data } from "src/app/interfaces/data";

@Injectable()

export class UserEffect {
    
    constructor(
        private actions$:Actions,
        private userService:UserService){}


    //Load user
    @Effect()
    loadUsers$: Observable<Action | unknown> = this.actions$.pipe(
        ofType<userActions.LoadUsers> (
            userActions.UsersActionTypes.LOAD_USERS
        ),
        mergeMap((actions: userActions.LoadUsers) => 
            this.userService.getUsers(actions.payload).pipe(
                map((users:User[])=> 
                    new userActions.LoadUsersSuccess(users)
                ),
                catchError(err => of(new userActions.LoadUsersFail(err)))
            )
        )
    
    )
    
    // <------------------------------------------>
    
    //Add user
    @Effect()
    addUser$: Observable<Action> = this.actions$.pipe(
        ofType<userActions.AddUser>(
            userActions.UsersActionTypes.ADD_USER
        ),
        map((action: userActions.AddUser) => action.payload),
        mergeMap((user: Data) =>
                this.userService.createUser(user).pipe(
                    map(
                        (newUser: Data)=>
                        new userActions.AddUserSuccess(newUser)
                    ),
                    catchError(err=>of(new userActions.AddUserFail(err)))
                ))
    )

    // <------------------------------------------>
    
    //Edit user
    @Effect()
    editUser$: Observable<Action> = this.actions$.pipe(
        ofType<userActions.EditUser>(
            userActions.UsersActionTypes.EDIT_USER
        ),
        map((action: userActions.EditUser) => action.payload),
        mergeMap((user: Data) =>
                this.userService.updateUser(user).pipe(
                    map(
                        (user: Data)=>
                        new userActions.EditUserSuccess(user)
                    ),
                    catchError(err=>of(new userActions.EditUserFail(err)))
                ))
    )
 
    // <------------------------------------------>
    
    //Delete user
    @Effect()
    deleteUser$: Observable<Action> = this.actions$.pipe(
        ofType<userActions.DeleteUser>(
            userActions.UsersActionTypes.DELETE_USER
        ),
        map((action: userActions.DeleteUser) => action.payload),
        mergeMap((data: Data) =>
                this.userService.deleteUser(data.id).pipe(
                    map(
                        (user: Data)=>
                        new userActions.DeleteUserSuccess(user)
                    ),
                    catchError(err=>of(new userActions.DeleteUserFail(err)))
                ))
    )

}