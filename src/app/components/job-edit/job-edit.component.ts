import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import { EmploymentDetail,EmploymentDetailEdit  } from '../../models/employment';
import { EquipmentAmount } from '../../models/equipment'

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
  selling: string[] = ["รับงาน", "กำลังจำหน่าย", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า","สำเร็จ "];
  jobUpdate: EmploymentDetail;
  status_select: any = []
  status_list: any = []
  id_list: any;
  status: EmploymentDetailEdit;
  amount!: EquipmentAmount;
  eq_amount: any = [];
  emd_edit: any = [];
  emd_id: any;

  
  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService) {
    this.jobEdit = [];
    this.jobUpdate = new EmploymentDetail();
    this.status = new EmploymentDetailEdit();
    this.amount = new EquipmentAmount;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.getJobEdit();
  }

  async getIdEmd(id: any) {
    this.emd_id = id;
    this.apiService.emDetail(id).then((res: any) => {
      console.log(res[0].status)
      //  console.log(res);
      this.emd_edit = res[0];
        this.status_select = res[0].status
        console.log("wow"+this.status_select)
      if (res[0].status == 'สำเร็จ') {
        (<HTMLInputElement> document.getElementById("status")).disabled = true;
      }
    });
  }

  getJobEdit() {
    this.apiService.getEmploymentDetail(this.id).then((res: any) => {
      this.getData(res);
      // for (let i = 0 ; i<this.jobEdit.length ; i++) {
      //   this.status_select.push(res[i].status)
      // }
      // for (var item of this.jobEdit) {
      //   this.status_select.push(item.em_detail_id)
      // }
      // console.log(this.status_select)
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
    console.log("id"+this.id_list)
    console.log("status"+this.status_list)
  }

  onClickBack() {
    this.location.back();
  }

  getData(data:any){
    this.jobEdit=data;
  }

  onClickSave(id:any, eqd_id:any, amount:any) {
    // for (let i = 0 ; i<this.status_list.length ; i++) {
      this.status.status = this.status_list
      console.log("test"+this.status_list)
      console.log(this.status)
      this.apiService.updateEmd(parseInt(this.id_list), this.status).then((res: any) => {
        this.getJobEdit()
        if (this.status_list == "สำเร็จ") {
          console.log("toey"+eqd_id)
              this.amount.amount = amount
              this.amount.eqd = eqd_id
        //       console.log("id"+this.amount.eqd+"จำนวน"+this.amount.amount)
              this.apiService.updateEqStatusSuccess(this.id,this.amount).then((res: any) => {
                // console.log(this.jobEdit[i].detail_id);
                });   
        }
      });
        // console.log(parseInt(this.id_list[i]));
        // console.log(this.status);
        //   this.eq_amount = res;
        //   console.log(this.eq_amount)
        //   if (this.status_list[i] == "สำเร็จ") {
        //       this.amount.amount = this.eq_amount[i].amount
        //       this.amount.eqd = this.eq_amount[i].detail_id
        //       console.log("id"+this.amount.eqd+"จำนวน"+this.amount.amount)
        //       this.apiService.updateEqStatusSuccess(this.id,this.amount).then((res: any) => {
        //         // console.log(this.jobEdit[i].detail_id);
        //         });
          
          
        // }
       
        
      
    // }
    // this.apiService.getEmploymentDetail(this.id).then((res: any) => {
      
    // });
    // this.location.back();
    
  }


}
