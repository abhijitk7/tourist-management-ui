import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router";
import { Company } from "../models/company.model"
import { EventTypes } from "../models/eventTypes.model";
import { ToastService } from "../service/toast.service";
import { UserService } from "../service/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;

  constructor(private userService:UserService,private router:Router,private toastService:ToastService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      companyName: new FormControl("", [Validators.required]),
      place: new FormControl("", [Validators.required]),
      website: new FormControl("", [
        Validators.pattern(
          "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?",
        ),
      ]),
      contact: new FormControl("", [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
        ),
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
        ),
      ]),
    })
  }

  register() {
    console.log("Register method called")
    let company: Company = new Company()
    company.place = this.registerForm.value.place
    company.branchName=this.registerForm.value.companyName
    company.confirmPassword= this.registerForm.value.confirmPassword
    company.contact=this.registerForm.value.contact
    company.email=this.registerForm.value.email
    company.password=this.registerForm.value.password
    company.website=this.registerForm.value.website

    this.userService.saveOrUpdateCompany(company).subscribe(response=>{
      console.dir(response);
      this.registerForm.reset();
      this.router.navigate(['login']);
      this.toastService.showToast(EventTypes.Success ,"Hi there!","Company details saved successfully with unique company id "+response.id);
    },error=>{
      this.toastService.showToast(EventTypes.Error ,"Hi there!","Error occured while saving company details!");
    })

  }
}
