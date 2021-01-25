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

  generatePDF() {
    var data = document.getElementById('invoicePDF');
    html2canvas(data!).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF'+this.em_id+''+'.pdf');
      pdf.output('dataurlnewwindow');
    });

  }
}
