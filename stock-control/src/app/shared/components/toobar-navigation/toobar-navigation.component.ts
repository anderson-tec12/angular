import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toobar-navigation',
  templateUrl: './toobar-navigation.component.html',
  styleUrls: ['./toobar-navigation.component.scss']
})
export class ToobarNavigationComponent {
  constructor(
    private cookieService:CookieService,
    private router:Router
  ){}

  signOut():void{
    this.cookieService.delete('USER_INFO')
    this.router.navigate(['/home'])
  }
}
