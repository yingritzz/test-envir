import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import { Admin } from '../../models/admin'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  adminProfile: any = [];
  id_admin: any;
  admin_edit!: Admin;

  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService) { }

  ngOnInit(): void {
    this.id_admin = localStorage.getItem("id");
    this.getprofile();
    this.admin_edit = new Admin();
  }

  async onClickHome() {
    this.router.navigateByUrl('home')
  }

  getprofile(){
    this.apiService.adminProfile(this.id_admin).then((res: any) => {
      this.adminProfile = res[0];
      this.admin_edit = res[0];
    });
  }

  updateAdmin() {
    this.apiService.updateAdmin(this.id_admin, this.admin_edit).then((res: any) => {
      this.getprofile();
      Swal.fire("แก้ไขสำเร็จ", "", "success");
    });
  }

}
