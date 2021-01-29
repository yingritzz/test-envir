import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import { EquipmentAmount } from '../../models/equipment'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  jobDetail: any;
  type: any;
  id: any;
  eq_amount: EquipmentAmount;

  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService) {
    this.jobDetail = [];
    this.eq_amount = new EquipmentAmount;
  }

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.params["type"];
    this.id = this.activatedRoute.snapshot.params["id"];
    this.getJobDetail();
  }

  onClickBack() {
    this.location.back();
  }

  getJobDetail() {
    this.apiService.getEmploymentDetail(this.id).then((res: any) => {
      this.getDataJob(res);
    });
  }

  getDataJob(data: any) {
    this.jobDetail = data;
  }

  onClickDelete() {
    Swal.fire({
      title: 'ยืนยันการลบ',
      html: 'งานทั้งหมดจากใบเสร็จเลขที่ ' + this.id ,
      showDenyButton: true,
      confirmButtonText: `ใช่`,
      denyButtonText: `ไม่ใช่`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        for (let i=0 ; i < this.jobDetail.length ; i++) {
          this.eq_amount.eqd = this.jobDetail[i].detail_id;
          this.eq_amount.amount = this.jobDetail[i].amount;
          console.log(this.eq_amount)
          this.apiService.updateEqStatusSuccess(this.id, this.eq_amount).then((res: any) => {
          });
        }
        this.apiService.deleteEm(this.id).then((res: any) => {
          Swal.fire('ลบสำเร็จ!', '', 'success')
          this.goBack();
        });
      }
    })
  }

  goBack() {
    window.history.back();
  }

}
