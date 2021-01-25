import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import { EmploymentDetail,EmploymentDetailEdit  } from '../../models/employment';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  statusArray: string[] = [];
  jobEdit: any = []
  id: any;
  rentals: string[] = ["รับงาน", "กำลังเช่า-ยืม", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า","สำเร็จ"];
  testing: string[] = ["รับงาน", "กำลังทดสอบ", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า","สำเร็จ"];
  maintenanc: string[] = ["รับงาน", "กำลังซ่อมบำรุง", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า","สำเร็จ"];
  selling: string[] = ["รับงาน", "กำลังจำหน่าย", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า","สำเร็จ"];
  jobUpdate: EmploymentDetail;
  status_select: any = []
  status_list: any = []
  id_list: any = []
  status: EmploymentDetailEdit;
  
  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService) {
    this.jobEdit = [];
    this.jobUpdate = new EmploymentDetail();
    this.status = new EmploymentDetailEdit();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.getJobEdit();
  }

  getJobEdit() {
    this.apiService.getEmploymentDetail(this.id).then((res: any) => {
      this.getData(res);
      for (let i = 0 ; i<this.jobEdit.length ; i++) {
        this.status_select.push(res[i].status)
      }
      for (var item of this.jobEdit) {
        this.status_select.push(item.em_detail_id)
      }
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
    this.status_list.push(status);
    this.id_list.push(id)
  }

  onClickBack() {
    this.location.back();
  }

  getData(data:any){
    this.jobEdit=data;
  }

  onClickSave() {
    for (let i = 0 ; i<this.id_list.length ; i++) {
      this.status.status = this.status_list[i]
      this.apiService.updateEmd( parseInt(this.id_list[i]), this.status).then((res: any) => {
        // console.log(parseInt(this.id_list[i]));
        // console.log(this.status);
        });

        if (this.status.status == "สำเร็จ") {
          this.apiService.updateEqStatusSuccess(this.jobEdit[i].detail_id).then((res: any) => {
            // console.log(this.jobEdit[i].detail_id);
            });
        }
    }
    this.apiService.getEmploymentDetail(this.id).then((res: any) => {
    });
    this.location.back();
  }


}
