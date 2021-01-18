import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer';
import { Equipment } from '../../models/equipment';
import { EquipmentDetail } from '../../models/equipment-detail';
import { Employment } from '../../models/employment';


@Component({
  selector: 'app-getjob',
  templateUrl: './getjob.component.html',
  styleUrls: ['./getjob.component.css']
})
export class GetjobComponent implements OnInit {

  eq = ["ตรวจวัดคุณภาพอากาศ", "ตรวจวัดระดับเสียง", "ตรวจวัดความสั่นสะเทือน", "ตรวจวัดคุณภาพน้ำ"];
  cg = ["เช่า-ยืม", "จำหน่าย", "ทดลอง", "ซ่อมบำรุง"]

  cus_select: any;
  catagory_select: any
  equipment_select: any
  count_select: any
  cus_list: any = [];
  email: any;
  phone: any;
  address: any;
  eq_list: any = [];
  eqd_list: any = [];
  eqd_new!: EquipmentDetail;
  eqd!: EquipmentDetail;
  eqd_names: any;
  eqd_name!: EquipmentDetail;
  name: any = [];

  cus_id: any;
  d_getjob: any;
  d_endjob: any;
  catagory: any = [];
  equipment: any = [];
  status: any = [];
  amount: any = [];
  annotation: string = " ";
  date_get: any;
  date_end: any;
  annot: string = " ";
  job: Employment;


  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.eqd_new = new EquipmentDetail();
    this.eqd = new EquipmentDetail();
    this.d_getjob = new Date();
    this.d_endjob = new Date();
    this.job = new Employment;
    this.eqd_names = [];
  }

  ngOnInit(): void {
    this.getAllEq();
    this.getAllEqd();
  }

  async getAllCustomers() {
    this.apiService.getListCustomers().then((res: any) => {
      this.cus_list = res;
    });
  }
  show_cus(data: any) {
    this.cus_list = [];
    console.log(data);
    this.cus_id = data.id;
    this.email = data.cus_email;
    this.phone = data.cus_phone;
    this.address = data.number + " ม." + data.moo + " " + data.sub_district + " " + data.district + " " + data.province + " " + data.postal_code;
    this.cus_select = data.cus_fullname;
  }
  async getAllEq() {
    this.apiService.getListEq().then((res: any) => {
      this.eq_list = res;
    });
  }
  async getAllEqd() {
    this.apiService.getListEqd().then((res: any) => {
      this.eqd_list = res;
    });
  }
  async getEqd(id:any) {
    this.apiService.getEqd(id).then((res: any) => {
      this.eqd_names = res;
      this.name.push(this.eqd_names[0].eq_detail_name);
      console.log(this.name);
    });
  }
  async create_eqd() {
    this.apiService.createEqDetail(this.eqd_new).then((res: any) => {
      console.log(this.eqd_new);
    });
    this.eqd_new = new EquipmentDetail();
    this.getAllEqd();
  }

  async add_getJob() {
    this.getEqd(this.equipment_select);

    this.catagory.push(this.catagory_select);
    this.equipment.push(this.equipment_select);
    this.status.push('รับงาน');
    this.amount.push(this.count_select);
    this.date_get = this.d_getjob;
    this.date_end = this.d_endjob;
    this.annot = this.annotation;

    this.catagory_select = '';
    this.equipment_select = '';
    this.count_select = '';

    // console.log(this.catagory);
    // console.log(this.equipment);
    // console.log(this.status);
    // console.log(this.amount);
    // console.log(this.annotation);
  }

  deleteRow(i: any) {
    this.catagory.splice(i);
    this.equipment.splice(i);
    this.amount.splice(i);
    this.status.splice(i);
    this.name.splice(i);
  }

  save() {
    (this.job).category = "{"+(this.catagory).toString()+"}";
    (this.job).date_get_job = this.date_get;
    (this.job).date_end_job = this.date_end;
    (this.job).em_status = "{"+(this.status).toString()+"}";
    (this.job).cus_id = parseInt(this.cus_id);
    (this.job).equipment = "{"+(this.equipment).toString()+"}";
    (this.job).admin_id = 1;
    (this.job).amount = "{"+(this.amount).toString()+"}";
    (this.job).annotation = this.annot;
    
    this.apiService.createEmployment(this.job).then((res: any) => {
      console.log('////////////////////');
      console.log(this.job);
      console.log('create job');
      this.router.navigate(['invoice']);
    }); 
  }
}
