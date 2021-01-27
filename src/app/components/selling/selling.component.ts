import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.css']
})
export class SellingComponent implements OnInit {

  jobSelling: any;
  sell: any;
  id!: number;
  type: string = "selling";

  page = 1;
  count = 0;
  tableSize = 30;

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.jobSelling = [];
  }

  ngOnInit(): void {
    this.getJobSelling();
  }

  getJobSelling() {
    this.apiService.getEmployment("selling").then((res: any) => {
      console.log(res);
      this.getData(res);
    });
  }

  getData(data: any) {
    this.jobSelling = data;
  }

  delete(id: number, name: any) {
    Swal.fire({
      title: 'ยืนยันการลบ',
      html: name + '<br>' + 'จากใบเสร็จเลขที่ ' + id,
      showDenyButton: true,
      confirmButtonText: `ใช่`,
      denyButtonText: `ไม่ใช่`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteEmployment(this.type, id).then((res: any) => {
          console.log('deleted '+ this.id);
          this.getJobSelling();
        });
        Swal.fire('ลบสำเร็จ!', '', 'success')
      }
    })
  }

  onTableDataChange(event: any){
    this.page = event;
    this.getJobSelling();
  } 
}
