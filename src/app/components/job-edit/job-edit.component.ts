import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../../services/api.service'


@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  statusArray: string[] = [];
  jobEdit: any;
  type: any;
  id: any;
  rentals: string[] = ["กำลังเช่า-ยืม","ส่งของให้ลูกค้า","ลูกค้ารับสินค้า"];
  testing: string[] = ["กำลังทดสอบ","ส่งของให้ลูกค้า","ลูกค้ารับสินค้า"];
  maintenanc: string[] = ["กำลังซ่อมบำรุง","ส่งของให้ลูกค้า","ลูกค้ารับสินค้า"];
  selling: string[] = ["กำลังจำหน่าย","ส่งของให้ลูกค้า","ลูกค้ารับสินค้า"];
  jobUpdate: any;
  test: any;
  re = /\{/gi;
  
  
  

  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService) {
      this.jobEdit = [];
     }

     ngOnInit(): void {
      this.type = this.activatedRoute.snapshot.params["type"];
      this.id = this.activatedRoute.snapshot.params["id"];
      this.getJobEdit();
    }
  
    getJobEdit() {
      this.apiService.getEmploymentDetail(this.type,this.id).then((res: any) => {
        console.log(res);
        this.jobEdit = res;
        this.test = res[0].toString().replace(this.re,"");
        console.log(res[0].amount.split(","));
        console.log(this.test);
      });
    }
    statusChange(status: any){
      if (status == "เช่า-ยืม"){
        this.statusArray = this.rentals;
        console.log(this.statusArray);

      } else if (status == "ซ่อมบำรุง") {
        this.statusArray = this.maintenanc; 
        console.log(this.statusArray);

      } else if (status == "ทดสอบ") {
        this.statusArray = this.testing;
        console.log(this.statusArray);

      } else if (status == "จำหน่าย") {
        this.statusArray = this.selling;
        console.log(this.statusArray);
      }
    }

  onClickBack() {
    this.location.back();
  }

}
