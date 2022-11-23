import { Component, OnInit } from "@angular/core"
import { Company } from "../models/company.model"
import { CompanyService } from "../service/company.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyListResponse } from "../models/company-list-response.model";

@Component({
  selector: "app-search-tourist-places",
  templateUrl: "./search-tourist-places.component.html",
  styleUrls: ["./search-tourist-places.component.css"],
})
export class SearchTouristPlacesComponent implements OnInit {
 
  companies:Company[]=[];
  selectedCompany:Company=new Company;
  isLoading:Boolean=true;
  isAPIError:Boolean=false;
  searchText!:string;
  searchCompanyList!:any;
  
  constructor(private companyService:CompanyService) { }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies(){
    this.companyService.getAllCompanies().subscribe(
      response=>{
        this.companies=response.companies;
        
        this.isLoading=false;
      },error=>{
        this.isLoading=false;
      }
    )
  }

  openTouristPakages(company: Company) {
    console.dir(company)
    this.selectedCompany=company;
  }

  clearAndCloseForm(needApiCall: boolean = true) {
    let closeButton = document.getElementById("close")
    closeButton?.click()
    if (needApiCall) {
      this.getAllCompanies();
    }
  }

  searchCompany(enteredText: string): void {

  }

  closePopUp() {
    this.clearAndCloseForm(false)
  }
}
