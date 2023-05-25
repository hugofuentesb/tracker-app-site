import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { take, tap } from "rxjs";
import { AuthService } from "../services/auth.service";


export const AuthGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.isAuthenticated$().pipe(
        take(1),
        tap( (isLoggedIn)  =>
            !isLoggedIn ? router.navigate( ['/login'] ): true
        )
    );

}