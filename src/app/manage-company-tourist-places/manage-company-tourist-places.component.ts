import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { Company } from '../models/company.model';
import { CompanyTariffs } from '../models/company.tariffs.model';
import { EventTypes } from '../models/eventTypes.model';
import { TouristPlaces } from '../models/tourist.places.model';
import { CompanyService } from '../service/company.service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-manage-company-tourist-places',
  templateUrl: './manage-company-tourist-places.component.html',
  styleUrls: ['./manage-company-tourist-places.component.css']
})
export class ManageCompanyTouristPlacesComponent implements OnInit {

  companyId:String='';
  companyDetails:Company;
  touristPlaces:TouristPlaces[];
  addPackageForm!:FormGroup;
  isLoading:Boolean=true;
  isPackagesGettingSaved:Boolean=false;

  constructor(private route: ActivatedRoute,private companyService:CompanyService,private formBuilder: FormBuilder,private toastService: ToastService) { }

  ngOnInit(): void {

    this.addPackageForm = this.formBuilder.group({
      Rows: this.formBuilder.array([])
    });

    this.companyId=this.route.snapshot.params.companyId;

    this.getTouristPlaces();
    
  }

  get formArr() {
    return this.addPackageForm.get("Rows") as FormArray;
  }

  getTouristPlaces(){
    this.isLoading=true;
    this.companyService.getAllTouristPlaces().subscribe(response=>{
      this.touristPlaces=response.touristPlaces;
      this.getCompanyDetails();
      this.isLoading=false;
    },error=>{
      console.error("Error occured while getting list of tourist places")
      this.toastService.showToast(EventTypes.Error ,"Hi there!","Error occured while getting list of tourist places!");
    })
  }

  getCompanyDetails(){
    this.companyService.getCompanyDetails(this.companyId).subscribe(response=>{
      this.companyDetails=response.companies[0];
      this.companyDetails.tariffs.forEach((row) => {
        this.formArr.push(this.addRow(row));
      });
    },error=>{
      this.toastService.showToast(EventTypes.Error ,"Hi there!","Error occured while fetching company details!");
      console.error("Error occured while fetching company details"+error);
    })
  }

  addRow(tarrif:CompanyTariffs) {
    return this.formBuilder.group({
      id:[tarrif.id],
      companyId:[tarrif.companyId],
      place: [tarrif.place,Validators.required],
      cost: [tarrif.cost,Validators.required],
      lastUpdated:[new Date]
    });
  }

  addNewPackage() {
    let tarrif:any={
      place:{} ,
      cost: 0,
      companyId: this.companyId
    }
    
    this.formArr.push(this.addRow(tarrif));
  }


  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  compareFn(c1: any, c2:any): boolean {     
    return c1 && c2 ? c1.id === c2.id : c1 === c2; 
  }


  onSave(){
    this.isPackagesGettingSaved=true;
    this.companyDetails.tariffs.splice(0); 
    this.companyDetails.tariffs=this.addPackageForm.value.Rows;
    this.companyService.updateCompanyTariffs(this.companyDetails).subscribe(response=>{
      this.isPackagesGettingSaved=false;
      this.toastService.showToast(EventTypes.Success,"Hi there!","Package details saved successfully!");
    },error=>{
      this.isPackagesGettingSaved=false;
      this.toastService.showToast(EventTypes.Error ,"Hi there!","Error occured while updating package details!");
    })

  }

  

}
