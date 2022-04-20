import * as userActions from "./user.actions"
import { User } from "src/app/interfaces/user"
import * as fromRoot from "../../state/app-state"
import { createFeatureSelector, createSelector } from "@ngrx/store"
import { EntityState, EntityAdapter,createEntityAdapter } from"@ngrx/entity"

export interface UserState {
    users:User[],
    page:number,
    loading:boolean,
    loaded:boolean,
    error:string
}

export interface AppState extends fromRoot.AppState {
    users:UserState   
}


export const initialState: UserState = {
    users:[],
    page:1,
    loading:false,
    loaded:false,
    error:""
}

export function UserReducer(state = initialState, action:userActions.Actions):UserState {
 switch(action.type) {

    
    //Load user
    case userActions.UsersActionTypes.LOAD_USERS: {
        return {
            ...state,
            loading:true
        }
    }
    case userActions.UsersActionTypes.LOAD_USERS_SUCCESS: {
      return  {
          ...state,
          users:action.payload,
          page:1,
          loading:false,
          loaded:true
      }
    }
    case userActions.UsersActionTypes.LOAD_USERS_FAIL: {
        return {
            ...state,
            loading:false,
            loaded:false,
            error:action.payload
        }
    }
 
    // <------------------------------------------>
    
    //Add user
    case userActions.UsersActionTypes.ADD_USER: {
        return {
            ...state,
            loading:true,
            error: ""
        }
    }
    case userActions.UsersActionTypes.ADD_USER_SUCCESS: {
        return {
            ...state,
            loading:false,
            error: "null"
        }
    }
    case userActions.UsersActionTypes.ADD_USER_FAIL: {
        return {
            ...state,
            loading:false,
            error: action.payload
        }
    }

     // <------------------------------------------>
    
    //Edit user
    case userActions.UsersActionTypes.EDIT_USER: {
        return {
            ...state,
            loading:true,
            error: ""
        }
    }
    case userActions.UsersActionTypes.EDIT_USER_SUCCESS: {
        return {
            ...state,
            loading:false,
            error: "null"
        }
    }
    case userActions.UsersActionTypes.EDIT_USER_FAIL: {
        return {
            ...state,
            loading:false,
            error: action.payload
        }
    }
    
    // <------------------------------------------>
    
    //Delete user
    case userActions.UsersActionTypes.DELETE_USER: {
        return {
            ...state,
            loading:true,
            error: ""
        }
    }
    case userActions.UsersActionTypes.DELETE_USER_SUCCESS: {
        return {
            ...state,
            loading:false,
            error: "null"
        }
    }
    case userActions.UsersActionTypes.DELETE_USER_FAIL: {
        return {
            ...state,
            loading:false,
            error: action.payload
        }
    }

    default: {
        return state
    }
 }   
}

const getUserFeatureState = createFeatureSelector<UserState>(
    "users"
)

export const getState = createSelector(
    getUserFeatureState,
    (state: UserState) => state
)

export const getUsers = createSelector(
    getUserFeatureState,
    (state: UserState) => state.users
)

export const getUsersLoading = createSelector(
    getUserFeatureState,
    (state: UserState) => state.loading
)

export const getUsersLoaded = createSelector(
    getUserFeatureState,
    (state: UserState) => state.loaded
)

export const getUsersError = createSelector(
    getUserFeatureState,
    (state: UserState) => state.error
)


