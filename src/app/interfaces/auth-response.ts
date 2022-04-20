export interface AuthResponse {
        $id?:string,
        code?: number,
        message?: string,
        data?: {
         Id?: number,
         Name?: string,
         Email?: string,
         Token?: string
        }
}
