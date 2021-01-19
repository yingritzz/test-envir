import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  em_id!: number;
  em_data: any;
  em_date: any;
  em_equipment: any;
  em_category: any;
  em_amount: any;
  em_eq: any = [];


  datepipe = new DatePipe('en-US');

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService
  ) {
    this.em_data = [];
  }

  ngOnInit(): void {
    this.em_id = this.activatedRoute.snapshot.params["id"];
    this.getEmployment();
  }

  getEmployment() {
    this.apiService.getEmploymentId(this.em_id).then((res: any) => {
      this.em_data = res;
      this.em_date = this.datepipe.transform(res[0].date_get_job, 'dd MMM yyyy');

      this.em_equipment = (res[0].equipment).split(",");
      this.em_category = (res[0].category).split(",");
      this.em_amount = (res[0].amount).split(",");
      this.getDataEq(this.em_equipment);
    });
  }

  getDataEq(data: any) {
    this.em_equipment=data;
 
    for ( let i=0 ; i<this.em_equipment.length; i++) {
      console.log(this.em_equipment[i]);
      this.apiService.getEqd(this.em_equipment[i]).then((res: any) => {
        console.log(res);
        this.em_eq.push(res[0].eq_detail_name);
      });
    }
  }




}
