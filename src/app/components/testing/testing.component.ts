import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  jobTesting: any;
  sell: any;
  id!: number;
  type: string = "testing";

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.jobTesting = [];
  }

  ngOnInit(): void {
    this.getJobTesting();
  }

  getJobTesting() {
    this.apiService.getEmployment("testing").then((res: any) => {
      this.getData(res);
    });
  }

  getData(data: any) {
    this.jobTesting = data;
  }

  delete(id: number, index:number) {
    Swal.fire({
      title: 'ยืนยันการลบ',
      html: this.jobTesting[index].string_agg + '<br>' + 'จากใบเสร็จเลขที่ ' + this.jobTesting[index].id,
      showDenyButton: true,
      confirmButtonText: `ใช่`,
      denyButtonText: `ไม่ใช่`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteEmployment(this.type,id).then((res: any) => {
          console.log('deleted '+ this.id);
          this.getJobTesting();
        });
        Swal.fire('ลบสำเร็จ!', '', 'success')
      }
    })
  }
}
