import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeaderInterceptor } from "./headers-interceptor";

export const httpIntercepProviders = [
    {
        provide:HTTP_INTERCEPTORS, useClass:HeaderInterceptor, multi: true
    },
]