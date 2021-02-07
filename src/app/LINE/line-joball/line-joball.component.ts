import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { EmploymentDetail, EmploymentDetailEdit } from '../../models/employment';
import { EquipmentAmount } from '../../models/equipment';

@Component({
  selector: 'app-line-joball',
  templateUrl: './line-joball.component.html',
  styleUrls: ['./line-joball.component.css']
})
export class LineJoballComponent implements OnInit {

  jobs: any = []
  jobEdit: any = []


  statusArray: string[] = [];
  id: any;
  rentals: string[] = ["รับงาน", "กำลังเช่า-ยืม", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ"];
  testing: string[] = ["รับงาน", "กำลังทดสอบ", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ"];
  maintenanc: string[] = ["รับงาน", "กำลังซ่อมบำรุง", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ"];
  selling: string[] = ["รับงาน", "กำลังจำหน่าย", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ "];
  jobUpdate: EmploymentDetail;
  status_select: any = []
  status_list: any = []
  id_list: any;
  status: EmploymentDetailEdit;
  amount!: EquipmentAmount;
  emd_edit: any = [];
  emd_id: any;

  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService
  ) {
    this.jobUpdate = new EmploymentDetail();
    this.status = new EmploymentDetailEdit();
    this.amount = new EquipmentAmount;
   }

  ngOnInit(): void {
    this.getOverdue();
  }

  getOverdue() {
    this.apiService.getHome('lastinsert').then((res: any) => {
      this.jobs = res
      // console.log(this.jobs)
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
    console.log(id)
  }

  clickEdit(id:any){
      this.apiService.getEmploymentDetail(id).then((res: any) => {
        this.jobEdit = res
        console.log(res)
        for (let i = 0; i < this.jobEdit.length; i++){
          this.status_select = this.jobEdit[i].status
          // console.log(res[i].status)
        }
        
      });
  }

  onClickSave(id: any, eqd_id: any, amount: any) {
    this.status.status = this.status_list
    this.apiService.updateEmd(parseInt(this.id_list), this.status).then((res: any) => {
      this.getOverdue()
      if (this.status_list == "สำเร็จ") {
        this.amount.amount = amount
        this.amount.eqd = eqd_id
        this.apiService.updateEqStatusSuccess(id, this.amount).then((res: any) => {
        });
      }
    });
  }

}
