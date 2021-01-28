import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { Router } from '@angular/router';
import { EquipmentDetail, EquipmentAmount } from '../../models/equipment';
import { Employment, EmploymentDetail } from '../../models/employment';
import { DatePipe } from '@angular/common'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-getjob',
  templateUrl: './getjob.component.html',
  styleUrls: ['./getjob.component.css']
})
export class GetjobComponent implements OnInit {

  eq = ["ตรวจวัดคุณภาพอากาศ", "ตรวจวัดระดับเสียง", "ตรวจวัดความสั่นสะเทือน", "ตรวจวัดคุณภาพน้ำ"];
  cg = ["เช่า-ยืม", "จำหน่าย", "ทดสอบ", "ซ่อมบำรุง"]
  datepipe = new DatePipe('en-US');
  minDate = new DatePipe('en-US').transform(Date.now(), 'yyyy-MM-dd');
  form!: FormGroup;
  formArray: any = [];
  em_id: any;

  cus_select: any;  //ng-model
  cus_list: any = [];  //data of api get customer list
  email: any;  //email of customer select
  phone: any;  //phone of customer select
  address: any;  //address of customer select
  eq_list: any = [];  //data of api get eq id เลือกชนิดตอนสร้างอุปกรณ์
  eqd_list: any = [];  //data of api get eqd เลือกอุปกรณ์
  eqd_new!: EquipmentDetail;  //create eqd
  date: any = [];  //เก็บวันที่จบงานใส่ []
  cus: any = [];  //เก็บชื่ออุปกรณ์
  cus_data: any;  //เก็บข้อมูลอุปกรณ์
  moo: any;
  soi: any;
  road: any;

  cus_id: any;
  admin_id: any;
  annotation: string = " ";
  annot: string = " ";
  job: Employment;
  job_detail: EmploymentDetail;
  eq_amount!: EquipmentAmount;

  constructor(
    public router: Router,
    public apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.eqd_new = new EquipmentDetail;
    this.job = new Employment;
    this.job_detail = new EmploymentDetail;
    this.eq_amount = new EquipmentAmount;
  }

  ngOnInit(): void {
    this.admin_id = localStorage.getItem("id");
    this.getAllEq();
    this.getAllEqd();
    document.getElementById("dateEnd")!.setAttribute("min", this.minDate!);
    this.form = this.formBuilder.group({
      category: [null, Validators.required],
      eq_detail_id: [null, Validators.required],
      date_get_job: [null, Validators.required],
      date_end_job: [null, Validators.required],
      amount: [null, Validators.required],
      status: [null],
      em_id: [null],
      eq_detail_name: [null],
      date_end: [null],
    });
  }

  async getAllCustomers() {
    this.cus = []
    this.apiService.getListCustomers().then((res: any) => {
      this.getData(res);
      for (let i = 0; i < res.length; i++) {
        this.cus.push(res[i].cus_fullname);
      }
    });
  }
  getData(data: any) {
    this.cus_list = data;
  }
  show_cus(data: any) {
    for (let i = 0; i < this.cus_list.length; i++) {
      if (this.cus_list[i].cus_fullname == data) {
        this.cus_data = this.cus_list[i]
      }
    }
    this.cus_id = this.cus_data.id;
    this.email = this.cus_data.cus_email;
    this.phone = this.cus_data.cus_phone;

    if (this.cus_data.moo == null) {
      this.moo = ""
    } else {
      this.moo = " ม." + this.cus_data.moo;
    }
    if (this.cus_data.soi == null || this.cus_data.soi == " ") {
      this.soi = ""
    } else {
      this.soi = "ซอย" + this.cus_data.soi;
    }
    if (this.cus_data.road == null || this.cus_data.road == " ") {
      this.road = ""
    } else {
      this.road = "ถนน" + this.cus_data.road;
    }

    this.address = this.cus_data.number + this.moo + " " + this.soi + " " + this.road + " " + this.cus_data.sub_district + " " + this.cus_data.district + " " + this.cus_data.province + " " + this.cus_data.postal_code;
    this.cus_select = this.cus_data.cus_fullname;
  }
  async getAllEq() {
    this.apiService.getListEq().then((res: any) => {
      this.eq_list = res;
    });
  }
  async getAllEqd() {
    this.eqd_list = [];
    this.apiService.getListEqd().then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].eq_detail_status != 'ไม่ว่าง')
          this.eqd_list.push(res[i]);
      }
    });
  }
  async create_eqd() {
    this.eqd_new.eq_detail_status = "ว่าง " + this.eqd_new.eq_detail_amount;
    this.apiService.createEqDetail(this.eqd_new).then((res: any) => {
      this.eqd_list.push(res[0]);
    });
    this.eqd_new = new EquipmentDetail();
  }

  async add_getJob() {
    this.form.value.status = 'รับงาน'
    this.annot = this.annotation;
    if (this.form.valid) {
      this.apiService.getEqd(this.form.value.eq_detail_id).then((res: any) => {
        this.form.value.eq_detail_name = res[0].eq_detail_name;
        this.form.value.date_end = this.datepipe.transform(this.form.value.date_end_job, 'dd MMM yyyy')
        this.formArray.push(this.form.value);
        this.form.reset();
        Swal.fire("เพิ่มงานสำเร็จ!", 'สามารถตรวจสอบรายละเอียดความถูกต้องของงาน' + '<br>' + 'ได้ที่ตารางด้านล่าง', "success");
      });
    } else {
      Swal.fire("ไม่สามารถเพิ่มรายการได้ได้", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }

    for (let i=0 ; i<this.eqd_list.length ; i++) {
      if (this.form.value.eq_detail_id == this.eqd_list[i].id) {
        this.eqd_list.splice(i, 1);
      }
    }
  }

  deleteRow(i: number) {
    this.apiService.getEqd(this.formArray[i].eq_detail_id).then((res: any) => {
      this.eqd_list.push(res[0]);
    });
    this.formArray.splice(i, 1);
  }

  save() {
    (this.job).admin_id = parseInt(this.admin_id);
    (this.job).cus_id = parseInt(this.cus_id);
    (this.job).annotation = this.annot;

    this.apiService.createEmployment(this.job).then((res: any) => {
      this.em_id = res[0].lastval;
      for (let i = 0; i < this.formArray.length; i++) {
        this.formArray[i].em_id = res[0].lastval;
        this.apiService.createEmDetail(this.formArray[i]).then((response: any) => {
          (this.eq_amount).amount = parseInt(this.formArray[i].amount);
          (this.eq_amount).eqd = this.formArray[i].eq_detail_id;

          this.apiService.updateEqStatus(this.formArray[i].em_id, this.eq_amount).then((resp: any) => {
            console.log(this.formArray[i].em_id);
          });
        });
      }

      this.apiService.getEmDetail(this.em_id).then((res: any) => {
        this.router.navigate(['invoice/' + this.em_id]);
      });
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

}
