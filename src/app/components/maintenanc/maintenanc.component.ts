import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

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
  test: string[] = [];
  


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
    this.apiService.getEmployment("maintenanc").then((res: any) => {
      console.log(res);
      this.jobMaintenanc = res;
    });
  }

  delete(id: number) {
    //Delete item in Student data
    this.apiService.deleteEmployment(id).then((res: any) => {
      console.log('deleted '+ this.id);
      this.getJobMaintenanc();
    });
  }

  statusChange(wow:any){
    if (wow == 'ซ่อมบำรุง'){
      console.log("ddsdas");
    }
  }

}

