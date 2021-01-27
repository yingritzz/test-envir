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

  page = 1;
  count = 0;
  tableSize = 30;

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
        this.apiService.deleteEmployment(this.type,id).then((res: any) => {
          console.log('deleted '+ this.id);
          this.getJobRental();
        });
        Swal.fire('ลบสำเร็จ!', '', 'success')
      }
    })
  }

  onTableDataChange(event: any){
    this.page = event;
    this.getJobRental();
  } 
}