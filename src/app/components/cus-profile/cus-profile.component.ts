import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../models/customer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cus-profile',
  templateUrl: './cus-profile.component.html',
  styleUrls: ['./cus-profile.component.css']
})
export class CusProfileComponent implements OnInit {

  id!: number;
  cusEdit: Customer;
  cusData: any;
  cus: any;
  cusProfile: any = [];
  rental: any = [];
  testing: any = [];
  maintenanc: any = [];
  selling: any = [];
  date_rental: any = [];
  date_testing: any = [];
  date_maintenanc: any = [];
  date_selling: any = [];

  moo: any;
  soi: any;
  road: any;
  address: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService,
    public router: Router
  ) {
    this.cusEdit = new Customer();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.getCustomer();
    this.profile();
  }

  getCustomer() {
    this.apiService.getCustomer(this.id).then((res: any) => {
      this.getData(res);
    
      if (res[0].moo == null) {
        this.moo=""
      } else {
        this.moo = " ม."+res[0].moo;
      }
      if (res[0].soi == null || res[0].soi == "") {
        this.soi=""
      }else {
        this.soi = "ซอย"+res[0].soi;
      }
      if (res[0].road == null || res[0].road == "") {
        this.road=""
      }else {
        this.road = "ถนน"+res[0].road;
      }
      this.address = res[0].number + this.moo + " " +this.soi + " " +this.road + " " + res[0].sub_district + " " + res[0].district + " " + res[0].province + " " + res[0].postal_code;
      this.cusEdit = res[0]

    });
  }
  getData(data: any) {
    this.cusData=data;
  }

  update() {
    if (this.cusEdit.moo == undefined || this.cusEdit.moo == null || this.cusEdit.moo == "") {
      this.cusEdit.moo = "null" ;
    }
    if (this.cusEdit.soi == undefined || this.cusEdit.soi == null || this.cusEdit.soi == "") {
      this.cusEdit.soi = ""
    }
    if (this.cusEdit.road == undefined || this.cusEdit.road == null || this.cusEdit.road == "") {
      this.cusEdit.road = "" ;
    }

    this.apiService.updateCustomer(this.id, this.cusEdit).then((res: any) => {
    window.location.reload();
    console.log(this.cusEdit);
    });
  }

  delete() {
    Swal.fire({
      title: 'ยืนยันการลบข้อมูลลูกค้า',
      text: this.cusData[0].cus_fullname,
      showDenyButton: true,
      confirmButtonText: `ใช่`,
      denyButtonText: `ไม่ใช่`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteCustomer(this.id).then((res: any) => {
          // console.log('deleted '+ this.id);
          this.router.navigate(['customer']);
          this.refreshCustomers();
        });
        Swal.fire('ลบสำเร็จ!', '', 'success')
      }
    })
  }

  refreshCustomers() {
    this.apiService.getListCustomers().then((res: any) => {
      // console.log('customerList : ' + res);
      this.cus = res;
    });
  }

  profile(){
    this.apiService.customerProfile(this.id).then((res: any) => {
      // console.log('customerList : ' + res);
      this.cusProfile = res;
      console.log(this.cusProfile)
      for (let i = 0; i < this.cusProfile.length; i++) {
        if (this.cusProfile[i].category == 'เช่า-ยืม'){
            this.rental.push(this.cusProfile[i].eq_detail_name);
            console.log(this.rental);
              this.date_rental.push(this.cusProfile[i].date_get_job)
              console.log(this.date_rental)
           
              
        }
        else if (this.cusProfile[i].category == 'ทดสอบ'){
          this.testing.push(this.cusProfile[i].eq_detail_name);
          console.log(this.testing);
      }
      else if (this.cusProfile[i].category == 'ซ่อมบำรุง'){
        this.maintenanc.push(this.cusProfile[i].eq_detail_name);
        console.log(this.maintenanc);
    }
    else if (this.cusProfile[i].category == 'จำหน่าย'){
      this.selling.push(this.cusProfile[i].eq_detail_name);
      console.log(this.selling);
  }
      }
    });
  }

}
