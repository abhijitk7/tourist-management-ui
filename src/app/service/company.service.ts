import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constant/constants';
import { CompanyListResponse } from '../models/company-list-response.model';
import { Company } from '../models/company.model';
import { TouristPlacesResponse } from '../models/tourist.places.response.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }


  getAllCompanies(){
    return this.http.get<CompanyListResponse>(`${API_URL}/tourism/api/v1/company`);
  }

  getCompanyDetails(companyId:String){
    return this.http.get<CompanyListResponse>(`${API_URL}/tourism/api/v1/id/`+companyId);
  }

  getAllTouristPlaces(){
    return this.http.get<TouristPlacesResponse>(`${API_URL}/tourism/api/v1/places`);
  }

}
