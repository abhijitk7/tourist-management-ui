import { Component, OnInit } from "@angular/core"
import { Company } from "../models/company.model"
import { CompanyService } from "../service/company.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyListResponse } from "../models/company-list-response.model";
import { EventTypes } from "../models/eventTypes.model";
import { ToastService } from "../service/toast.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-search-tourist-places",
  templateUrl: "./search-tourist-places.component.html",
  styleUrls: ["./search-tourist-places.component.css"],
})
export class SearchTouristPlacesComponent implements OnInit {
 
  companies:Company[]=[];
  selectedCompany:Company=new Company;
  isLoading:Boolean=true;
  isPackagesLoading:Boolean=false;
  isAPIError:Boolean=false;
  searchText!:string;
  searchCompanyList!:any;
  searchForm!:FormGroup;

   // City Names
   searchCriteriaData: any = ['Company Id', 'Company Name', 'Tourist Place']
  
  constructor(private companyService:CompanyService,private toastService:ToastService,private router:Router) { }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      criteriaValue: new FormControl('', [Validators.required]),
      searchValue: new FormControl('', [Validators.required])
    })
  
    this.getAllCompanies();
  }

  getAllCompanies(){
    this.isLoading=false;
    this.companyService.getAllCompanies().subscribe(
      response=>{
        this.companies=response.companies;
        this.isLoading=false;
      },error=>{
        this.isLoading=false;
        this.toastService.showToast(EventTypes.Error ,"Hi there!","Error occured while fetching company details!");
        this.router.navigate(['login']);
      }
    )
  }

  openTouristPakages(company: Company) {
    this.isPackagesLoading=true;
    setTimeout(()=>{
      console.log("Purposfully waiting");
      this.selectedCompany=company;
      this.isPackagesLoading=false;
    },1000);
    
  }

  clearInput(){
    this.searchForm.reset();
    this.getAllCompanies();
  }

  

  getImagePath(touristDestination:string):String{
    let imagePath:String;
    switch(touristDestination){
      case "Andaman":
        imagePath="../../assets/andaman.jpeg";
        break;
      case "Dubai":
        imagePath="../../assets/Dubai.jpeg";
        break;
      case "Thailand":
        imagePath="../../assets/Thailand.jpeg";
        break;
      case "Singapore":
        imagePath="../../assets/Singapore.jpeg";
        break;
      case "Malaysia":
        imagePath="../../assets/Malaysia.jpeg";
        break;
      default:
        imagePath="../../assets/Dubai.jpeg";
        break;
    }
    return imagePath;
  }

  clearAndCloseForm(needApiCall: boolean = true) {
    let closeButton = document.getElementById("close")
    closeButton?.click()
    if (needApiCall) {
      this.getAllCompanies();
    }
  }


  searchCompany(): void {
    console.log("Register method called")
    if(this.searchForm.valid){
      let searchCriteria: string = '';
      let searchValue:string='';
      searchCriteria=this.searchForm.value.criteriaValue;
      searchValue=this.searchForm.value.searchValue;
      this.isLoading=true;
      searchCriteria=searchCriteria.split(":")[1].trim();
      if('Company Name'===searchCriteria){
        searchCriteria="companyName"
      }else if("Company Id"===searchCriteria){
        searchCriteria="id"
      }else if("Tourist Place"===searchCriteria){
        searchCriteria="touristPlace"
      }
      this.companyService.searchTouristPlace(searchCriteria,searchValue).subscribe(response=>{
        console.dir(response);
        this.companies=response.companies;  
        this.isLoading=false;
      },error=>{
        this.isLoading=false;
        this.toastService.showToast(EventTypes.Error ,"Hi there!","Error occured while fetching company details!");
        //this.router.navigate(['login']);
      })
    }
    

  }

   // Choose city using select dropdown
   changeSearchCriteria(e) {
    console.log(e.value)
    this.criteriaValue!.setValue(e.target.value, {
      onlySelf: true
    })
  }

  // Getter method to access formcontrols
  get criteriaValue() {
    return this.searchForm.get('criteriaValue');
  }


}
