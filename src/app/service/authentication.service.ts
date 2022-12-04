import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constant/constants';
import { LoginRequest } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  


  login(loginRequest:LoginRequest){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    return this.http.post(`${API_URL}/tourism/user/login`,loginRequest,httpOptions);
  }
}
