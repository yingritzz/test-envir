import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import { EqDetailComponent } from '../eq-detail/eq-detail.component';
import { EmploymentDetail } from '../../models/employment-detail';


@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  statusArray: string[] = [];
  jobEdit: any = []
  id: any;
  rentals: string[] = ["รับงาน","กำลังเช่า-ยืม","ส่งของให้ลูกค้า","ลูกค้ารับสินค้า"];
  testing: string[] = ["รับงาน","กำลังทดสอบ","ส่งของให้ลูกค้า","ลูกค้ารับสินค้า"];
  maintenanc: string[] = ["รับงาน","กำลังซ่อมบำรุง","ส่งของให้ลูกค้า","ลูกค้ารับสินค้า"];
  selling: string[] = ["รับงาน","กำลังจำหน่าย","ส่งของให้ลูกค้า","ลูกค้ารับสินค้า"];
  jobUpdate: EmploymentDetail;
  test: any = []
  idtest!: number
  status!: string
  hello: any = []

  xxx: any = [];
  xxy: any;
  
  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService) {
      this.jobEdit = [];
      this.jobUpdate = new EmploymentDetail();
     }

     ngOnInit(): void {
      this.id = this.activatedRoute.snapshot.params["id"];
      this.getJobEdit();
    }
  
    getJobEdit() {
      this.apiService.getEmploymentDetail(this.id).then((res: any) => {
        console.log(res);
        this.jobEdit = res;
        for (var item of this.jobEdit) {
          this.hello.push('รับงาน')
          console.log(this.hello)
        }
        for (var item of this.jobEdit) {
          this.hello.push(item.em_detail_id)
          console.log(this.hello)
        }
        
      });
    }
    statusChange(status: any){
      if (status == "เช่า-ยืม"){
        this.statusArray = this.rentals;

      } else if (status == "ซ่อมบำรุง") {
        this.statusArray = this.maintenanc; 

      } else if (status == "ทดสอบ") {
        this.statusArray = this.testing;

      } else if (status == "จำหน่าย") {
        this.statusArray = this.selling;
      }
    }

updateStatus(id: any, status: string){
  this.idtest = id
  this.status = status
  this.test.push(status)
  console.log(this.test)
} 

  onClickBack() {
    // this.location.back();
  }


}
