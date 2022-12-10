import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ADMIN, USER } from "./constant/constants"
import { ErrorComponent } from "./error/error.component"
import { LoginComponent } from "./login/login.component"
import { ManageCompanyTouristPlacesComponent } from "./manage-company-tourist-places/manage-company-tourist-places.component"
import { RegisterComponent } from "./register/register.component"
import { SearchTouristPlacesComponent } from "./search-tourist-places/search-tourist-places.component"
import { RoleGuardService } from "./service/role-guard.service"
import { RouteGuardService } from "./service/route-guard.service"

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "company/:companyId",
    component: ManageCompanyTouristPlacesComponent,
    canActivate: [RoleGuardService], 
    data: { 
      expectedRole: USER
    } 
  },
  {
    path: "search",
    component: SearchTouristPlacesComponent,
    canActivate: [RoleGuardService], 
    data: { 
      expectedRole: ADMIN
    } 
  },
  {
    path: "**",
    component: ErrorComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
