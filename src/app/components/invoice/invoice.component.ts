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
  cus_fullname!: string;
  cus_number!: string;
  cus_moo!: string;
  cus_sub_district!: string;
  cus_district!: string;
  cus_province!: string;
  cus_postal_code!: string;


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
      this.cus_fullname = res[0].cus_fullname;
      this.cus_number = res[0].number;
      this.cus_moo = res[0].moo;
      this.cus_sub_district = res[0].sub_district;
      this.cus_district = res[0].district;
      this.cus_province = res[0].province;
      this.cus_postal_code = res[0].postal_code;
    });
  }

}
