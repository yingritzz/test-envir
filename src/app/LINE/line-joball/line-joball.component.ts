import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { EmploymentDetail, EmploymentDetailEdit } from '../../models/employment';
import { EquipmentAmount } from '../../models/equipment';
import Swal from 'sweetalert2';
import liff from '@line/liff';

@Component({
  selector: 'app-line-joball',
  templateUrl: './line-joball.component.html',
  styleUrls: ['./line-joball.component.css']
})
export class LineJoballComponent implements OnInit {

  statusArray: string[] = [];
  id: any;
  rentals: string[] = ["รับงาน", "อยู่ระหว่างการเช่า-ยืม", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "ลูกค้าส่งของคืน", "บริษัทรับของคืน", "สิ้นสุดการเช่ายืม"];
  testing: string[] = ["รับงาน", "อยู่ระหว่างการทดสอบ", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "ลูกค้าส่งสินค้า", "บริษัทรับสินค้า", "สิ้นสุดการทดสอบ"];
  maintenanc: string[] = ["รับงาน", "อยู่ระหว่างการซ่อมบำรุง", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "ลูกค้าส่งสินค้า", "บริษัทรับสินค้า", "สิ้นสุดการซ่อมบำรุง"];
  selling: string[] = ["รับงาน", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สิ้นสุดการจำหน่าย"];
  jobUpdate: EmploymentDetail;
  status_select: any = []
  status_list: any = []
  id_list: any;
  status: EmploymentDetailEdit;
  amount!: EquipmentAmount;
  emd_edit: any = [];
  emd_id: any;
  thisStatus: any;

  jobAll: any = [];
  id_i: any;
  id_j: any;
  id_job: any = [];
  id_status: any;
  lineEmail: any;
  page = 1;
  count = 0;
  tableSize = 10

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
  os: ReturnType<typeof liff.getOS>;

  ngOnInit(): void {
    this.getJobAll();
    this.getFromLine();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getJobAll();
  }

  getJobAll() {
    this.apiService.getEmAll().then((res: any) => {
      this.getData(res)
    });
  }
  getData(data: any) {
    this.jobAll = data;
  }
  async getFromLine() {
    await liff.init({ liffId: "1655665001-GKm9YPZ9" })
    const profile = await liff.getProfile();
    this.lineEmail = await profile.userId
    console.log(this.lineEmail);
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
  }

  getStatus(data: any) {
    this.thisStatus = data
  }

  async clickEdit(id: any) {
    this.apiService.getEmploymentDetail(id).then(async (res: any) => {
      // this.jobEdit = await res;
      this.getStatus(res)
    });
  }

  async clickChangeStatus(j: any, i: any, job: any) {
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
