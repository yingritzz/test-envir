import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
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

  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService) {
    this.jobDetail = [];
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
      this.jobDetail = res;
    });
  }

  onClickDelete() {
    // console.log(this.id)
    Swal.fire({
      title: 'ยืนยันการลบ',
      html: 'งานทั้งหมดจากใบเสร็จเลขที่ ' + this.id ,
      showDenyButton: true,
      confirmButtonText: `ใช่`,
      denyButtonText: `ไม่ใช่`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
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
