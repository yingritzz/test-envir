import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { EmploymentDetail, EmploymentDetailEdit } from '../../models/employment';
import { EquipmentAmount } from '../../models/equipment';

@Component({
  selector: 'app-line-maintenanc',
  templateUrl: './line-maintenanc.component.html',
  styleUrls: ['./line-maintenanc.component.css']
})
export class LineMaintenancComponent implements OnInit {

  jobMaintenanc: any;
  sell: any;
  id!: number;
  type: string = "maintenanc";

  lastinsert: any = [];

  jobs: any = []
  jobEdit: any = []

  
  rentals: string[] = ["รับงาน", "กำลังเช่า-ยืม", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ"];
  testing: string[] = ["รับงาน", "กำลังทดสอบ", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ"];
  maintenanc: string[] = ["รับงาน", "กำลังซ่อมบำรุง", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ"];
  selling: string[] = ["รับงาน", "กำลังจำหน่าย", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ "];
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
    this.getJobMaintenanc();
  }

  getJobMaintenanc() {
    this.apiService.getEmployment(this.type).then((res: any) => {
      // console.log(res);
      this.getData(res);
    });
  }

  getData(data: any) {
    this.jobMaintenanc = data;
  }

  ///detail

  getOverdue() {
    this.apiService.getHome('lastinsert').then((res: any) => {
      this.jobs = res
    });
  }

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
    console.log(this.status_list)
  }

  getStatus(data:any){
    this.thisStatus = data
  }

  clickEdit(id:any){
      this.apiService.getEmploymentDetail(id).then((res: any) => {
        this.jobEdit = res
        this.getStatus(res)
        console.log(this.jobEdit)
      });
      
  }
  clickChangeStatus(){

    for (let j = 0; j <this.jobMaintenanc.length; j++){
    for (let i = 0; i < this.thisStatus.length; i++){
      if (this.thisStatus[i].status == "สำเร็จ" || this.thisStatus[i].status == "สำเร็จ ") {
        (<HTMLInputElement>document.getElementById("status"+i+j)).disabled = true;   
      }
      else {
        (<HTMLInputElement>document.getElementById("status"+i+j)).disabled = false;
      }
    }
  }
}
  onClickSave(id: any, eqd_id: any, amount: any) {
    this.status.status = this.status_list
    console.log(this.status_list)
    this.apiService.updateEmd(parseInt(this.id_list), this.status).then((res: any) => {
      this.getOverdue()
      console.log(this.status_select)
      if (this.status_list == "สำเร็จ") {
        this.amount.amount = amount
        this.amount.eqd = eqd_id
        this.apiService.updateEqStatusSuccess(id, this.amount).then((res: any) => {
        });
      }
    });
  }

}
