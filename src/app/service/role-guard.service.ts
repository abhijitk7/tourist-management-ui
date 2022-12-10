import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ADMIN, TOKEN, USER } from '../constant/constants';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(private authenticationService:AuthenticationService,private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
       // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;


    if (
      !this.authenticationService.isAuthenticated() || 
      this.authenticationService.getLoggedInUserAuthority() !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
