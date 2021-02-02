import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { Router } from '@angular/router';
import { EquipmentDetail, EquipmentAmount } from '../../models/equipment';
import { Employment, EmploymentDetail } from '../../models/employment';
import { SearchCustomer } from '../../models/customer'
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
  cus_search!: SearchCustomer;

  cus_select: any;  //ng-model
  cus_list: any = [];  //data of api get customer list
  email: any;  //email of customer select
  phone: any;  //phone of customer select
  address: any;  //address of customer select
  eq_list: any = [];  //data of api get eq id เลือกชนิดตอนสร้างอุปกรณ์
  eqd_list: any = [];  //data of api get eqd เลือกอุปกรณ์
  eqd_new!: EquipmentDetail;  //create eqd
  date: any = [];  //เก็บวันที่จบงานใส่ []
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

  max = 7;

  constructor(
    public router: Router,
    public apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.eqd_new = new EquipmentDetail;
    this.job = new Employment;
    this.job_detail = new EmploymentDetail;
    this.eq_amount = new EquipmentAmount;
    this.cus_search = new SearchCustomer;
  }

  ngOnInit(): void {
    this.admin_id = localStorage.getItem("id");
    this.getAllEq();
    this.getAllEqd();
    document.getElementById("dateEnd")!.setAttribute("min", this.minDate!);
    (document.getElementById('save') as HTMLInputElement).disabled = true;
    this.form = this.formBuilder.group({
      category: [null, Validators.required],
      eq_detail_id: [null, Validators.required],
      date_get_job: [null, Validators.required],
      date_end_job: [null, Validators.required],
      amount: [null, Validators.required],
      status: [null],
      em_id: [null],
      eq_detail_name: [null],
      date_end: [null]
    });
  }

  checkAmount(amount:any){
    this.max = amount
  }
  async getCustomers(item: any) {
    if (item != "") {
      this.cus_search.text = item;
      this.apiService.searchCus(this.cus_search).then((res: any) => {
        this.getData(res);
      });
      (document.getElementById('email') as HTMLInputElement).disabled = true;
      (document.getElementById('phone') as HTMLInputElement).disabled = true;
      (document.getElementById('address') as HTMLInputElement).disabled = true;
    } else {
      this.cus_list = []
    }
  }
  getData(data: any) {
    this.cus_list = data;
  }
  show_cus(data: any) {
    this.cus_id = data.id;
    this.email = data.cus_email;
    this.phone = data.cus_phone;
    if (data.moo == null) {
      this.moo = ""
    } else {
      this.moo = " ม." + data.moo;
    }
    if (data.soi == null || data.soi == " ") {
      this.soi = ""
    } else {
      this.soi = "ซอย" + data.soi;
    }
    if (data.road == null || data.road == " ") {
      this.road = ""
    } else {
      this.road = "ถนน" + data.road;
    }
    this.address = data.number + this.moo + " " + this.soi + " " + this.road + " " + data.sub_district + " " + data.district + " " + data.province + " " + data.postal_code;
    this.cus_select = data.cus_fullname;
    this.cus_list = []
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
          console.log(this.eqd_list)
      }
    });
  }
  async create_eqd() {
    this.eqd_new.eq_detail_status = "ว่าง ";
    if (this.eqd_new.eq_id != undefined && this.eqd_new.id != undefined && this.eqd_new.eq_detail_name != null && this.eqd_new.eq_detail_amount != undefined) {
      this.apiService.createEqDetail(this.eqd_new).then((res: any) => {
        this.eqd_list.push(res[0]);
      });
      this.eqd_new = new EquipmentDetail();
    } else {
      Swal.fire("ไม่สามารถเพิ่มรายการอุปกรณ์ได้", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }
  }

  async add_getJob() {
    this.form.value.status = 'รับงาน'
    this.annot = this.annotation;
    (document.getElementById('save') as HTMLInputElement).disabled = false;
    if (this.form.valid) {
      this.apiService.getEqd(this.form.value.eq_detail_id).then((res: any) => {
        this.form.value.eq_detail_name = res[0].eq_detail_name;
        this.form.value.date_end = this.datepipe.transform(this.form.value.date_end_job, 'dd MMM yyyy')
        this.formArray.push(this.form.value);
        this.form.reset();
        Swal.fire("เพิ่มงานสำเร็จ!", 'สามารถตรวจสอบรายละเอียดความถูกต้องของงาน' + '<br>' + 'ได้ที่ตารางด้านล่าง', "success");
      });
    } else {
      Swal.fire("ไม่สามารถเพิ่มรายการได้", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }

    for (let i = 0; i < this.eqd_list.length; i++) {
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
    if (this.cus_id == null || this.cus_id == undefined) {
      Swal.fire("ไม่สามารถบันทึกรายการได้", "กรุณากรอกข้อมูลลูกค้าให้ครบถ้วน", "error");
    } else {
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
