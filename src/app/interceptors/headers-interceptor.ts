import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    tokenS: string = ''
    
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        
        console.log('token added')

        this.tokenS = localStorage.getItem('token') as string
        
        const modifiedRequest = req.clone({

            setHeaders: {

                'Authorization': `Bearer ${this.tokenS}`,

            }

        });

        return next.handle(modifiedRequest)

    }
}