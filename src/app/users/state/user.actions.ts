import { Action } from "@ngrx/store";
import { Data } from "src/app/interfaces/data";
import { User } from "src/app/interfaces/user";

export enum UsersActionTypes {
    
    LOAD_USERS = "[User] Load Users",
    LOAD_USERS_SUCCESS = "[User] Load Users Success",
    LOAD_USERS_FAIL = "[User] Load Users Fail",
    
    ADD_USER = "[User] Add User",
    ADD_USER_SUCCESS = "[User] Add User Success",
    ADD_USER_FAIL = "[User] Add User Fail",
    
    EDIT_USER = "[User] Edit User",
    EDIT_USER_SUCCESS = "[User] Edit User Success",
    EDIT_USER_FAIL = "[User] Edit User Fail",

    DELETE_USER = "[User] Delete User",
    DELETE_USER_SUCCESS = "[User] Delete User Success",
    DELETE_USER_FAIL = "[User] Delete User Fail",

}
//Load user
export class LoadUsers implements Action {

    readonly type = UsersActionTypes.LOAD_USERS

    constructor(public payload: number){}

}

export class LoadUsersSuccess implements Action {

    readonly type = UsersActionTypes.LOAD_USERS_SUCCESS

    constructor(public payload: User[]){}
}

export class LoadUsersFail implements Action {
    
    readonly type = UsersActionTypes.LOAD_USERS_FAIL

    constructor(public payload:string){}

}

// <------------------------------------------>

//Add user
export class AddUser implements Action {

    readonly type = UsersActionTypes.ADD_USER

    constructor(public payload: Data){}

}

export class AddUserSuccess implements Action {

    readonly type = UsersActionTypes.ADD_USER_SUCCESS

    constructor(public payload: Data){}

}

export class AddUserFail implements Action {

    readonly type = UsersActionTypes.ADD_USER_FAIL

    constructor(public payload: string){}

}

// <------------------------------------------>

//Edit user
export class EditUser implements Action {

    readonly type = UsersActionTypes.EDIT_USER

    constructor(public payload: Data){}

}

export class EditUserSuccess implements Action {

    readonly type = UsersActionTypes.EDIT_USER_SUCCESS

    constructor(public payload: Data){}

}

export class EditUserFail implements Action {

    readonly type = UsersActionTypes.EDIT_USER_FAIL

    constructor(public payload: string){}

}


// <------------------------------------------>

//Delete user
export class DeleteUser implements Action {

    readonly type = UsersActionTypes.DELETE_USER

    constructor(public payload: Data){}

}

export class DeleteUserSuccess implements Action {

    readonly type = UsersActionTypes.DELETE_USER_SUCCESS

    constructor(public payload: Data){}

}

export class DeleteUserFail implements Action {

    readonly type = UsersActionTypes.DELETE_USER_FAIL

    constructor(public payload: string){}

}

export type Actions = 
LoadUsers | 
LoadUsersSuccess | 
LoadUsersFail |
AddUser |
AddUserSuccess |
AddUserFail | 
EditUser |
EditUserSuccess |
EditUserFail |
DeleteUser |
DeleteUserSuccess |
DeleteUserFail 