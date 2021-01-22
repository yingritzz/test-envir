import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  jobRental: any;
  sell: any;
  id!: number;
  type: string = "rental";

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.jobRental = [];
  }

  ngOnInit(): void {
    this.getJobRental();
  }

  getJobRental() {
    this.apiService.getEmployment(this.type).then((res: any) => {
      console.log(res);
      this.getData(res);
    });
  }

  getData(data: any) {
    this.jobRental = data;
  }

  delete(id: number, index:number) {
    Swal.fire({
      title: 'ยืนยันการลบ',
      html: this.jobRental[index].string_agg + '<br>' + 'จากใบเสร็จเลขที่ ' + this.jobRental[index].id,
      showDenyButton: true,
      confirmButtonText: `ใช่`,
      denyButtonText: `ไม่ใช่`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteEmployment(this.type,id).then((res: any) => {
          console.log('deleted '+ this.id);
          this.getJobRental();
        });
        Swal.fire('ลบสำเร็จ!', '', 'success')
      }
    })
  }

}