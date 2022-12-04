import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
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
      localStorage.setItem("token",token||'');
      

      const decodedToken = helper.decodeToken(token||'');
      localStorage.setItem("email",decodedToken.email||'');
      localStorage.setItem("authority",decodedToken.authority||'');
      
      decodedToken.role.forEach(authority => {
        if(authority.authority==='ADMIN'){
          this.isAdmin=true
          return;
        }
      }); 
      if(this.isAdmin){
        this.router.navigate(['search']);
      }else{
        this.router.navigate(['company/d3e03f51-4293-497e-bc90-c79534d5570a']);
      }
    },error=>{
      this.toastService.showErrorToast("Hi there!","Login attempt failed!")
    })

  }

}
