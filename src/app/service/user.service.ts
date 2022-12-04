import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constant/constants';
import { Company } from '../models/company.model';
import { LoginRequest } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  saveOrUpdateCompany(company:Company){
    return this.http.post<Company>(`${API_URL}/tourism/api/v1/branch/add-places`,company);
  }
}
