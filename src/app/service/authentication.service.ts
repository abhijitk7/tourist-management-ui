import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ADMIN, API_URL, EMAIL, TOKEN, USER } from '../constant/constants';
import { LoginRequest } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn:boolean=false;

  constructor(private http:HttpClient) { }

  login(loginRequest:LoginRequest){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    return this.http.post(`${API_URL}/tourism/user/login`,loginRequest,httpOptions);
  }



  public isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService();
    const token = sessionStorage.getItem(TOKEN) as string;
    // Check whether the token is expired and return
    // true or false
    this.isLoggedIn=!jwtHelper.isTokenExpired(token);
    return this.isLoggedIn;
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(EMAIL)
  }

  getLoggedInUserAuthority():string{
    const jwtHelper = new JwtHelperService();

    const token = sessionStorage.getItem(TOKEN) as string;
    // decode the token to get its payload
    const tokenPayload =jwtHelper.decodeToken(token);
    let loggedInUserRole=USER;

    tokenPayload.role.forEach(authority => {
      if(authority.authority===ADMIN){
        loggedInUserRole=ADMIN
        return;
      }
    }); 
    return loggedInUserRole;
  }



  getAuthToken(){
    let token='';
    if(this.getAuthenticatedUser())
      token=sessionStorage.getItem(TOKEN) as string
    return token;
  }

  logOut(){
    window.sessionStorage.clear();
  }
}
