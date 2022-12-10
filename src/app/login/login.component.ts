import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ADMIN, AUTHORITY, COMPANY_ID, EMAIL, TOKEN } from '../constant/constants';
import { LoginRequest } from '../models/login.model';
import { AuthenticationService } from '../service/authentication.service';
import { ToastService } from '../service/toast.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  isAdmin:Boolean=false;

  constructor(private userService:UserService,private router:Router,private toastService:ToastService,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
  }

  handleLogin(){
    let loginRequest=new LoginRequest();
    loginRequest.email=this.loginForm.value.email;
    loginRequest.password=this.loginForm.value.password;

    this.authenticationService.login(loginRequest).subscribe((res: HttpResponse<any>)=>{
      this.loginForm.reset();
      const helper = new JwtHelperService();
      const token=res.headers.get('token');
      sessionStorage.setItem(TOKEN,token||'');
      
      const decodedToken = helper.decodeToken(token||'');
      sessionStorage.setItem(EMAIL,decodedToken.email||'');
      sessionStorage.setItem(AUTHORITY,decodedToken.authority||'');
      sessionStorage.setItem(COMPANY_ID,decodedToken.companyId||'');

      let loggedInUserAuthority=this.authenticationService.getLoggedInUserAuthority();

      if(loggedInUserAuthority===ADMIN){
        this.router.navigate(['search']);
      }else{
        this.router.navigate(['company/'+decodedToken.companyId]);
      }
    },error=>{
      this.toastService.showErrorToast("Hi there!","Login attempt failed!")
    })

  }

}
