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
    this.apiService.getEmDetail(this.em_id).then((res: any) => {
      this.em_data = res;
      this.em_date = this.datepipe.transform(res[0].date_get_job, 'dd-MM-yyyy');
    });
  }
}
