import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService:UserService, private router:Router) { }

  canActivate():Observable<boolean | UrlTree> | boolean | Promise<boolean | UrlTree| boolean | UrlTree>{
    const isUserLogged = this.userService.isLoggedIn()

    if(!isUserLogged){
      this.router.navigate(['/home'])
      return false
    }

    return true
  }
}
