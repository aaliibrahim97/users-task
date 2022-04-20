import { Data } from "./data";

export interface User {
    data: [{
        id?: string,
        name?: string,
        email?: string,
        profilepicture?:string
        location?: string,
        createdat?: string,
        length?:number
    }],
    page?: number
    per_page?: string
    total_pages?: number   
}
