import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cus-add',
  templateUrl: './cus-add.component.html',
  styleUrls: ['./cus-add.component.css']
})
export class CusAddComponent implements OnInit {

  data: Customer;
  cus: any;

  form!: FormGroup;

  constructor(
    private location: Location,
    public apiService: ApiService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.data = new Customer();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cus_fullname: [null, Validators.required],
      cus_email: [null, [Validators.required, Validators.email]],
      cus_phone: [null, Validators.required],
      number: [null, Validators.required],
      moo: [null],
      soi: [null],
      road: [null],
      sub_district: [null, Validators.required],
      district: [null, Validators.required],
      province: [null, Validators.required],
      postal_code: [null, Validators.required]
    });
  }

  onClickBack() {
    this.location.back();
  }

  onClickNewCus() {
    if (this.form.value.moo == undefined) {
      this.form.value.moo = "null";
    }
    if (this.form.value.soi == undefined) {
      this.form.value.soi = ""
    }
    if (this.form.value.road == undefined) {
      this.form.value.road = "";
    }

    if (this.form.valid) {
      console.log(this.form.value);
      this.create_cus()
    } else {
      Swal.fire("ไม่สามารถเพิ่มข้อมูลลูกค้าได้", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }
  }

  create_cus() {
    this.apiService.createCustomer(this.form.value).then((res: any) => {
      this.router.navigate(['customer']);
    });
  }

  isFieldValid(field: string) {
    return this.form.get(field)!.valid && this.form.get(field)!.touched;
  }
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  // btn_save() {
  //   if (this.data.cus_fullname == undefined) {
  //     (document.getElementById('cus_fullname') as HTMLInputElement).className = "form-control form-control-danger";
  //   }
  //   if (this.data.cus_email == undefined) {
  //     (document.getElementById('cus_email') as HTMLInputElement).className = "form-control form-control-danger";
  //   }
  //   if (this.data.cus_phone == undefined) {
  //     (document.getElementById('cus_phone') as HTMLInputElement).className = "form-control form-control-danger";
  //   }
  
  //   if( this.data.cus_fullname != undefined &&
  //     this.data.cus_email != undefined &&
  //     this.data.cus_phone != undefined) {
  //       this.create_cus();
  //   }
  // }

  // model_name(c: any) {
  //   if (c == "" || c == undefined) {
  //     (document.getElementById('cus_fullname') as HTMLInputElement).className = "form-control form-control-danger";
  //   } else {
  //     (document.getElementById('cus_fullname') as HTMLInputElement).className = "form-control";
  //   }
  // }
  // model_email(c: any) {
  //   if (c == "" || c == undefined) {
  //     (document.getElementById('cus_email') as HTMLInputElement).className = "form-control form-control-danger";
  //   } else {
  //     (document.getElementById('cus_email') as HTMLInputElement).className = "form-control";
  //   }
  // }
  // model_phone(c: any) {
  //   if (c == "" || c == undefined) {
  //     (document.getElementById('cus_phone') as HTMLInputElement).className = "form-control form-control-danger";
  //   } else {
  //     (document.getElementById('cus_phone') as HTMLInputElement).className = "form-control";
  //   }
  // }
}
