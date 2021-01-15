import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ApiService } from './services/api.service';

import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GetjobComponent } from './components/getjob/getjob.component';
import { SettingpageComponent } from './components/settingpage/settingpage.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { MaintenancComponent } from './components/maintenanc/maintenanc.component';
import { RentalComponent } from './components/rental/rental.component';
import { SellingComponent } from './components/selling/selling.component';
import { TestingComponent } from './components/testing/testing.component';
import { EqDetailComponent } from './components/eq-detail/eq-detail.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CusProfileComponent } from './components/cus-profile/cus-profile.component';
import { CusAddComponent } from './components/cus-add/cus-add.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

import { LineHomeComponent } from './LINE/line-home/line-home.component';
import { LineGetjobComponent } from './LINE/line-getjob/line-getjob.component';
import { LineHeaderComponent } from './LINE/line-header/line-header.component';
import { LineCustomerComponent } from './LINE/line-customer/line-customer.component';
import { LineEquipmentComponent } from './LINE/line-equipment/line-equipment.component';
import { LineEqDetailComponent } from './LINE/line-eq-detail/line-eq-detail.component';
import { LineMaintenancComponent } from './LINE/line-maintenanc/line-maintenanc.component';
import { LineRentalComponent } from './LINE/line-rental/line-rental.component';
import { LineSellingComponent } from './LINE/line-selling/line-selling.component';
import { LineTestingComponent } from './LINE/line-testing/line-testing.component';
import { EqEditComponent } from './components/eq-edit/eq-edit.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    GetjobComponent,
    SettingpageComponent,
    EquipmentComponent,
    MaintenancComponent,
    RentalComponent,
    SellingComponent,
    TestingComponent,
    EqDetailComponent,
    CustomerComponent,
    CusProfileComponent,
    CusAddComponent,
    InvoiceComponent,
    LineHomeComponent,
    LineGetjobComponent,
    LineHeaderComponent,
    LineCustomerComponent,
    LineEquipmentComponent,
    LineEqDetailComponent,
    LineMaintenancComponent,
    LineRentalComponent,
    LineSellingComponent,
    LineTestingComponent,
    EqEditComponent,
    JobDetailComponent,
    JobEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
