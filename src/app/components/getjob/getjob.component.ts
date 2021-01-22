import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipmentDetail } from '../../models/equipment-detail';
import { Employment } from '../../models/employment';
import { EmploymentDetail } from '../../models/employment-detail';
import { DatePipe } from '@angular/common'
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

  cus_select: any;  //ng-model
  catagory_select: any  //ng-model
  equipment_select: any  //ng-model
  count_select: any //ng-model
  d_getjob: any;  //ng-model
  d_endjob: any;  //ng-model
  cus_list: any = [];  //data of api get customer list
  email: any;  //email of customer select
  phone: any;  //phone of customer select
  address: any;  //address of customer select
  eq_list: any = [];  //data of api get eq id เลือกชนิดตอนสร้างอุปกรณ์
  eqd_list: any = [];  //data of api get eqd เลือกอุปกรณ์
  eqd_new!: EquipmentDetail;  //create eqd
  eqd_names: any;  //get eqd เพื่อดูชื่ออุปกรณ์
  name: any = [];  //เก็บชื่อุปกรณ์ใส่ []
  date: any = [];  //เก็บวันที่จบงานใส่ []
  cus: any =[];
  cus_data: any;
  moo: any;
  soi: any;
  road: any;

  cus_id: any;
  catagory: any = [];
  equipment: any = [];
  status: any = [];
  amount: any = [];
  annotation: string = " ";
  date_get: any = [];
  date_end: any = [];
  annot: string = " ";
  job: Employment;
  job_detail: EmploymentDetail;


  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.eqd_new = new EquipmentDetail();
    this.d_getjob = new Date();
    this.d_endjob = new Date();
    this.job = new Employment;
    this.job_detail = new EmploymentDetail;
    this.eqd_names = [];
  }

  ngOnInit(): void {
    this.getAllEq();
    this.getAllEqd();
  }

  async getAllCustomers() {
    this.cus=[]
    this.apiService.getListCustomers().then((res: any) => {
      this.getData(res);
      for ( let i=0 ; i<res.length ; i++) {
        this.cus.push(res[i].cus_fullname);
      }
      console.log(this.cus)
    });
  }

  getData(data:any) {
    this.cus_list=data;
  }
  show_cus(data: any) {
    for ( let i=0 ; i<this.cus_list.length ; i++) {
      if ( this.cus_list[i].cus_fullname == data) {
        this.cus_data=this.cus_list[i]
        // console.log(this.cus_data);
      }
    }
    this.cus_id = this.cus_data.id;
    this.email = this.cus_data.cus_email;
    this.phone = this.cus_data.cus_phone;

    if (this.cus_data.moo == null) {
      this.moo=""
    } else {
      this.moo = " ม."+this.cus_data.moo;
    }
    if (this.cus_data.soi == null || this.cus_data.soi == " ") {
      this.soi=""
    }else {
      this.soi = "ซอย"+this.cus_data.soi;
    }
    if (this.cus_data.road == null || this.cus_data.road == " ") {
      this.road=""
    }else {
      this.road = "ถนน"+this.cus_data.road;
    }
    
    this.address = this.cus_data.number + this.moo + " " +this.soi + " " +this.road + " " + this.cus_data.sub_district + " " + this.cus_data.district + " " + this.cus_data.province + " " + this.cus_data.postal_code;
    this.cus_select = this.cus_data.cus_fullname;
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
  async getEqd(id: any) {
    this.apiService.getEqd(id).then((res: any) => {
      this.eqd_names = res;
      this.name.push(this.eqd_names[0].eq_detail_name);
      // console.log(this.name);
    });
  }
  async create_eqd() {
    this.eqd_new.eq_detail_status = "ว่าง "+this.eqd_new.eq_detail_amount;
    this.apiService.createEqDetail(this.eqd_new).then((res: any) => {
      // console.log(this.eqd_new);
      this.getAllEqd();
    });
    
    this.eqd_new = new EquipmentDetail();
  }

  async add_getJob() {
    this.getEqd(this.equipment_select);

    this.catagory.push(this.catagory_select);
    this.equipment.push(this.equipment_select);
    this.status.push('รับงาน');
    this.amount.push(this.count_select);
    this.date_get.push(this.d_getjob);
    this.date_end.push(this.d_endjob);
    this.date.push(this.datepipe.transform(this.d_endjob, 'dd MMM yyyy'));
    this.annot = this.annotation;

    this.catagory_select = '';
    this.equipment_select = '';
    this.count_select = '';
    this.d_getjob = '';
    this.d_endjob = '';
    Swal.fire("เพิ่มงานสำเร็จ!", 'สามารถตรวจสอบรายละเอียดความถูกต้องของงาน' +'<br>' +'ได้ที่ตารางด้านล่าง', "success");
  }
  deleteRow(i: number) {
    // console.log(i,1);
    this.catagory.splice(i,1);
    this.equipment.splice(i,1);
    this.amount.splice(i,1);
    this.status.splice(i,1);
    this.date_get.splice(i,1);
    this.date_end.splice(i,1);

    this.name.splice(i,1);
    this.date.splice(i,1);
  }
  save() {
    (this.job).admin_id = 1;
    (this.job).cus_id = parseInt(this.cus_id);
    (this.job).annotation = this.annot;

    this.apiService.createEmployment(this.job).then((res: any) => {
      // console.log(res[0].lastval);
      for (let i = 0; i < this.catagory.length; i++) {
        (this.job_detail).category = this.catagory[i];
        (this.job_detail).date_get_job = this.date_get[i];
        (this.job_detail).date_end_job = this.date_end[i];
        (this.job_detail).status = this.status[i];
        (this.job_detail).amount = this.amount[i];
        (this.job_detail).em_id = res[0].lastval;
        (this.job_detail).eq_detail_id = this.equipment[i]
        // console.log(this.job_detail);

        this.apiService.createEmDetail(this.job_detail).then((response: any) => {
          // console.log('create job');
        }); 
      }
      this.router.navigate(['invoice/'+res[0].lastval]);
    }); 
  }

}
