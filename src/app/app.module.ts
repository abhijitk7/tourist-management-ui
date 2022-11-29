import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { LoginComponent } from "./login/login.component"
import { RegisterComponent } from "./register/register.component"
import { ManageCompanyTouristPlacesComponent } from "./manage-company-tourist-places/manage-company-tourist-places.component"
import { SearchTouristPlacesComponent } from "./search-tourist-places/search-tourist-places.component"
import { ErrorComponent } from "./error/error.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { HttpIntercepterService } from "./service/http/http-intercepter.service";
import { ToasterComponent } from './toaster/toaster/toaster.component';
import { ToastComponent } from './toaster/toast/toast.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ManageCompanyTouristPlacesComponent,
    SearchTouristPlacesComponent,
    ErrorComponent,
    ToasterComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercepterService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
