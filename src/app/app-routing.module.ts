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


const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'getjob', component:GetjobComponent},
  {path: 'maintenanc', component:MaintenancComponent},
  {path: 'rental', component:RentalComponent},
  {path: 'selling', component:SellingComponent},
  {path: 'testing', component:TestingComponent},
  {path: 'user/profile', component:ProfileComponent},
  {path: 'customer', component:CustomerComponent},
  {path: 'cusadd', component:CusAddComponent},
  {path: 'cusprofile', component:CusProfileComponent},
  {path: 'setting', component:SettingpageComponent},
  {path: 'equipment', component:EquipmentComponent},
  {path: 'equipment/detail', component:EqDetailComponent},
  {path: '**', component:LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
