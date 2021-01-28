import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cus-add',
  templateUrl: './cus-add.component.html',
  styleUrls: ['./cus-add.component.css']
})
export class CusAddComponent implements OnInit {

  data: Customer;
  cus: any;

  constructor(
    private location: Location,
    public apiService: ApiService,
    public router: Router
  ) {
    this.data = new Customer();
  }

  ngOnInit(): void {
  //  (document.getElementById('save') as HTMLInputElement).disabled = true;
  //   this.btn_save();
  }

  onClickBack() {
    this.location.back();
  }

  onClickNewCus() {
    if (this.data.moo == undefined) {
      this.data.moo = "null";
    }
    if (this.data.soi == undefined) {
      this.data.soi = ""
    }
    if (this.data.road == undefined) {
      this.data.road = "";
    }
    this.btn_save();
  }

  create_cus() {
    this.apiService.createCustomer(this.data).then((res: any) => {
      this.router.navigate(['customer']);
    });
  }

  btn_save() {
    if (this.data.cus_fullname == undefined) {
      (document.getElementById('cus_fullname') as HTMLInputElement).className = "form-control form-control-danger";
    }
    if (this.data.cus_email == undefined) {
      (document.getElementById('cus_email') as HTMLInputElement).className = "form-control form-control-danger";
    }
    if (this.data.cus_phone == undefined) {
      (document.getElementById('cus_phone') as HTMLInputElement).className = "form-control form-control-danger";
    }
    if (this.data.number == undefined) {
      (document.getElementById('number') as HTMLInputElement).className = "form-control form-control-danger";
    }
    if (this.data.sub_district == undefined) {
      (document.getElementById('sub_district') as HTMLInputElement).className = "form-control form-control-danger";
    }
    if (this.data.district == undefined) {
      (document.getElementById('district') as HTMLInputElement).className = "form-control form-control-danger";
    }
    if (this.data.province == undefined) {
      (document.getElementById('province') as HTMLInputElement).className = "form-control form-control-danger";
    }
    if (this.data.postal_code == undefined) {
      (document.getElementById('postal_code') as HTMLInputElement).className = "form-control form-control-danger";
    }
    if( this.data.cus_fullname != undefined &&
      this.data.cus_email != undefined &&
      this.data.cus_phone != undefined &&
      this.data.number != undefined &&
      this.data.sub_district != undefined &&
      this.data.district != undefined &&
      this.data.province != undefined && 
      this.data.postal_code != undefined) {
        this.create_cus();
    }
  }
  
  model_name(c: any) {
    if (c == "" || c == undefined) {
      (document.getElementById('cus_fullname') as HTMLInputElement).className = "form-control form-control-danger";
    } else {
      (document.getElementById('cus_fullname') as HTMLInputElement).className = "form-control";
    }
  }
  model_email(c: any) {
    if (c == "" || c == undefined) {
      (document.getElementById('cus_email') as HTMLInputElement).className = "form-control form-control-danger";
    } else {
      (document.getElementById('cus_email') as HTMLInputElement).className = "form-control";
    }
  }
  model_phone(c: any) {
    if (c == "" || c == undefined) {
      (document.getElementById('cus_phone') as HTMLInputElement).className = "form-control form-control-danger";
    } else {
      (document.getElementById('cus_phone') as HTMLInputElement).className = "form-control";
    }
  }
  model_number(c: any) {
    if (c == "" || c == undefined) {
      (document.getElementById('number') as HTMLInputElement).className = "form-control form-control-danger";
    } else {
      (document.getElementById('number') as HTMLInputElement).className = "form-control";
    }
  }
  model_sub_district(c: any) {
    if (c == "" || c == undefined) {
      (document.getElementById('sub_district') as HTMLInputElement).className = "form-control form-control-danger";
    } else {
      (document.getElementById('sub_district') as HTMLInputElement).className = "form-control";
    }
  }
  model_district(c: any) {
    if (c == "" || c == undefined) {
      (document.getElementById('district') as HTMLInputElement).className = "form-control form-control-danger";
    } else {
      (document.getElementById('district') as HTMLInputElement).className = "form-control";
    }
  }
  model_province(c: any) {
    if (c == "" || c == undefined) {
      (document.getElementById('province') as HTMLInputElement).className = "form-control form-control-danger";
    } else {
      (document.getElementById('province') as HTMLInputElement).className = "form-control";
    }
  }
  model_postal_code(c: any) {
    if (c == "" || c == undefined) {
      (document.getElementById('postal_code') as HTMLInputElement).className = "form-control form-control-danger";
    } else {
      (document.getElementById('postal_code') as HTMLInputElement).className = "form-control";
    }
  }
}
