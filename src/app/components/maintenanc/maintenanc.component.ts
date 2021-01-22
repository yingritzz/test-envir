import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenanc',
  templateUrl: './maintenanc.component.html',
  styleUrls: ['./maintenanc.component.css']
})
export class MaintenancComponent implements OnInit {

  jobMaintenanc: any;
  sell: any;
  id!: number;
  type: string = "maintenanc";


  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.jobMaintenanc = [];
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

  delete(id: number, index:number) {
    Swal.fire({
      title: 'ยืนยันการลบ',
      html: this.jobMaintenanc[index].string_agg + '<br>' + 'จากใบเสร็จเลขที่ ' + this.jobMaintenanc[index].id,
      showDenyButton: true,
      confirmButtonText: `ใช่`,
      denyButtonText: `ไม่ใช่`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteEmployment(this.type,id).then((res: any) => {
          this.getJobMaintenanc();
        });
        Swal.fire('ลบสำเร็จ!', '', 'success')
      }
    })
  }

 

}

