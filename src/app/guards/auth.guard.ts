
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { USER_STORAGE_KEY } from "@shared/constants/constant";
import { AuthService } from '@services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private readonly router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem(USER_STORAGE_KEY)) {
      return true;
      this.router.navigate(['/sumary']);
    }else{

      this.router.navigate(['']);

    return false;
    }
  }
}