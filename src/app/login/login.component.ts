import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/login.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private userService:UserService,private router:Router) { }

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

    this.userService.login(loginRequest).subscribe(response=>{
      console.dir(response);
      this.loginForm.reset();
      this.router.navigate(['search']);
    },error=>{
      console.dir(error);
    })

  }

}
