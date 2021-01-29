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
  x = new Array(48);

  page = 1;
  count = 0;
  tableSize = 30;

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

  onTableDataChange(event: any){
    this.page = event;
    this.getJobMaintenanc();
  } 
}

