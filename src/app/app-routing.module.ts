import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { ProfileComponent } from './components/profile/profile.component'
import { GetjobComponent } from './components/getjob/getjob.component'
import { SettingpageComponent } from './components/settingpage/settingpage.component'
import { EquipmentComponent } from './components/equipment/equipment.component'
import { MaintenancComponent } from './components/maintenanc/maintenanc.component'
import { RentalComponent } from './components/rental/rental.component'
import { SellingComponent } from './components/selling/selling.component'
import { TestingComponent } from './components/testing/testing.component'
import { EqDetailComponent } from './components/eq-detail/eq-detail.component'
import { CustomerComponent } from './components/customer/customer.component'
import { CusProfileComponent } from './components/cus-profile/cus-profile.component'
import { CusAddComponent } from './components/cus-add/cus-add.component'
import { InvoiceComponent} from './components/invoice/invoice.component'
import { EqEditComponent } from './components/eq-edit/eq-edit.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';

import { LineHomeComponent } from './LINE/line-home/line-home.component'
import { LineGetjobComponent } from './LINE/line-getjob/line-getjob.component'
import { LineEquipmentComponent } from './LINE/line-equipment/line-equipment.component'
import { LineEqDetailComponent } from './LINE/line-eq-detail/line-eq-detail.component'
import { LineCustomerComponent } from './LINE/line-customer/line-customer.component'
import { LineMaintenancComponent } from './LINE/line-maintenanc/line-maintenanc.component'
import { LineRentalComponent } from './LINE/line-rental/line-rental.component'
import { LineSellingComponent } from './LINE/line-selling/line-selling.component'
import { LineTestingComponent } from './LINE/line-testing/line-testing.component'

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'getjob', component:GetjobComponent},
  {path: 'invoice', component:InvoiceComponent},
  {path: 'maintenanc', component:MaintenancComponent},
  {path: 'rental', component:RentalComponent},
  {path: 'selling', component:SellingComponent},
  {path: 'testing', component:TestingComponent},
  {path: 'job/detail/:type/:id', component:JobDetailComponent},
  {path: 'job/edit', component:JobEditComponent},
  {path: 'user/profile', component:ProfileComponent},
  {path: 'customer', component:CustomerComponent},
  {path: 'cusadd', component:CusAddComponent},
  {path: 'customer/profile/:id', component:CusProfileComponent},
  {path: 'setting', component:SettingpageComponent},
  {path: 'equipment', component:EquipmentComponent},
  {path: 'equipment/detail/:id/:name', component:EqDetailComponent},
  {path: 'equipment/edit/sn', component:EqEditComponent},
  {path: 'line/home', component:LineHomeComponent},
  {path: 'line/getjob', component:LineGetjobComponent},
  {path: 'line/equipment', component:LineEquipmentComponent},
  {path: 'line/equipment/detail', component:LineEqDetailComponent},
  {path: 'line/customer', component:LineCustomerComponent},
  {path: 'line/maintenanc', component:LineMaintenancComponent},
  {path: 'line/rental', component:LineRentalComponent},
  {path: 'line/selling', component:LineSellingComponent},
  {path: 'line/testing', component:LineTestingComponent},
  {path: '**', component:LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
