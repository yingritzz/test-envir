import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { EmploymentDetail, EmploymentDetailEdit } from '../../models/employment';
import { EquipmentAmount } from '../../models/equipment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-line-rental',
  templateUrl: './line-rental.component.html',
  styleUrls: ['./line-rental.component.css']
})
export class LineRentalComponent implements OnInit {

  jobRental: any;
  sell: any;
  id!: number;
  type: string = "rental";

  jobs: any = []
  // jobEdit: any = []
  id_i: any;
  id_j: any;
  id_job: any = [];
  id_status: any;
  page = 1;
  count = 0;
  tableSize = 10;
  
  rentals: string[] = ["รับงาน", "อยู่ระหว่างการเช่า-ยืม", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "ลูกค้าส่งของคืน", "บริษัทรับของคืน", "สิ้นสุดการเช่ายืม"];
  testing: string[] = ["รับงาน", "อยู่ระหว่างการทดสอบ", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "ลูกค้าส่งสินค้า", "บริษัทรับสินค้า" , "สิ้นสุดการทดสอบ"];
  maintenanc: string[] = ["รับงาน", "อยู่ระหว่างการซ่อมบำรุง", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "ลูกค้าส่งสินค้า", "บริษัทรับสินค้า", "สิ้นสุดการซ่อมบำรุง"];
  selling: string[] = ["รับงาน", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สิ้นสุดการจำหน่าย"];
  statusArray: string[] = [];
  jobUpdate: EmploymentDetail;
  status_select: any = [];
  status_list: any = [];
  id_list: any;
  status: EmploymentDetailEdit;
  amount!: EquipmentAmount;
  emd_edit: any = [];
  emd_id: any;

  thisStatus: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService
  ) { 
    this.jobUpdate = new EmploymentDetail();
    this.status = new EmploymentDetailEdit();
    this.amount = new EquipmentAmount;
  }

  ngOnInit(): void {
    this.getJobRental();
  }

  onTableDataChange(event: any){
    this.page = event;
    this.getJobRental();
  }
  
  getJobRental() {
    this.apiService.getEmployment(this.type).then((res: any) => {
      console.log(res);
      this.getData(res);
    });
  }

  getData(data: any) {
    this.jobRental = data;
  }

  //detail

  statusChange(status: any) {
    if (status == "เช่า-ยืม") {
      this.statusArray = this.rentals;

    } else if (status == "ซ่อมบำรุง") {
      this.statusArray = this.maintenanc;

    } else if (status == "ทดสอบ") {
      this.statusArray = this.testing;

    } else if (status == "จำหน่าย") {
      this.statusArray = this.selling;
    }
  }

  updateStatus(id: any, status: string) {
    this.status_list = status;
    this.id_list = id
    console.log(id)
  }

  getStatus(data:any){
    this.thisStatus = data
  }

  clickEdit(id:any){
      this.apiService.getEmploymentDetail(id).then((res: any) => {
        // this.jobEdit = res
        this.getStatus(res)
      });
      
  }
  async clickChangeStatus(j:any ,i:any ,job:any) {
    this.id_i = await i;
    this.id_j = await j;
    this.id_job = await job;
    this.id_status = await this.thisStatus[j].status;
    if (this.id_status == "สิ้นสุดการเช่ายืม" || this.id_status == "สิ้นสุดการทดสอบ" ||
      this.id_status == "สิ้นสุดการซ่อมบำรุง" || this.id_status == "สิ้นสุดการจำหน่าย") {
      (document.getElementById('status') as HTMLInputElement).disabled = true;
    }
    else {
      (document.getElementById('status') as HTMLInputElement).disabled = false;
    }
  }

onClickSave(id: any, eqd_id: any, amount: any) {
  this.status.status = this.id_status
    this.apiService.updateEmd(parseInt(this.id_list), this.status).then((res: any) => {
      this.clickEdit(id);
      Swal.fire('แก้ไขสถานะงานสำเร็จ!', '', 'success')
      if (this.id_status == "สิ้นสุดการเช่ายืม" || this.id_status == "สิ้นสุดการทดสอบ" ||
      this.id_status == "สิ้นสุดการซ่อมบำรุง") {
        this.amount.amount = amount
        this.amount.eqd = eqd_id
        this.apiService.updateEqStatusSuccess(id, this.amount).then((res: any) => {
        });
      }
    });
  }

}
