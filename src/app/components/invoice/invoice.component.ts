import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common'
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {

  em_id!: number;
  em_data: any;
  em_date: any;
  moo: any;
  soi: any;
  road: any;
  address: any;

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
    this.getEmployment(this.em_id);
  }

  getEmployment(id: any) {
    this.apiService.getEmDetail(id).then((res: any) => {
      this.em_data = res;
      this.em_date = this.datepipe.transform(res[0].date_get_job, 'dd-MM-yyyy');

      if (this.em_data[0].moo == null) {
        this.moo = ""
      } else {
        this.moo = " ม." + this.em_data[0].moo;
      }
      if (this.em_data[0].soi == null || this.em_data[0].soi == "") {
        this.soi = ""
      } else {
        this.soi = "ซอย" + this.em_data[0].soi;
      }
      if (this.em_data[0].road == null || this.em_data[0].road == "") {
        this.road = ""
      } else {
        this.road = "ถนน" + this.em_data[0].road;
      }
      this.address = this.em_data[0].number + this.moo + " " + this.soi + " " + this.road + " " + this.em_data[0].sub_district + " " + this.em_data[0].district;
    });
  }

  generatePDF() {
    var data = document.getElementById('invoicePDF');
    html2canvas(data!).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/jpeg', 3.0)
      let pdf = new jspdf('p', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight)
      window.open(URL.createObjectURL(pdf.output("blob")))
    });
  }
}
