import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common'
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas';
import { THSarabunNew } from '../../models/admin'

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
      this.getData(res);
      this.getDate(this.datepipe.transform(res[0].date_get_job, 'dd-MM-yyyy'));

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
      this.getAddress(this.address);

    });
  }

  getData(data: any) {
    this.em_data = data;
  }
  getDate(data: any) {
    this.em_date = data;
  }
  getAddress(data: any) {
    this.address = data;
  }
  
  generatePDF() {
    var data = document.getElementById('invoicePDF');
    var cus_add = this.address;
    var cus_name = this.em_data[0].cus_fullname
    var cus_date = 'วันที่ : '+ this.em_date
    var cus_noEm = 'เลขที่ใบเสร็จ : '+ this.em_id
    var cus_post = this.em_data[0].province +' '+ this.em_data[0].postal_code
    // html2canvas(data!).then(canvas => {
    //   var imgWidth = 208;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;
    //   const contentDataURL = canvas.toDataURL('image/jpeg', 3.0)
    //   let pdf = new jspdf('p', 'mm', 'a4');
    //   pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight)
    //   window.open(URL.createObjectURL(pdf.output("blob")))
    // });
    const doc = new jspdf();
    doc.addFileToVFS("THSarabunNew.ttf", THSarabunNew)
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal")
    doc.setFont("THSarabunNew")
    doc.setLanguage('th')
    autoTable(doc, {
      //   html: '#table', 
      // styles: {
      //       font: "THSarabunNew"
      //     }
      head: [{ no: 'ลำดับที่', sn: 'SN', eq: 'อุปกรณ์', catagory: 'หมวดหมู่', amount: 'จำนวน' }, ],
      body: this.bodyRows(),
      showHead: 'everyPage',
      styles: {
        font: "THSarabunNew"
      },
      margin: { top: 60, bottom: 30},
      headStyles: {
        fillColor: [234, 234, 234],
        textColor: [0, 0, 0],
        fontSize: 18,
        fontStyle: 'bold'
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        fillColor: [255, 255, 255],
        fontSize: 15,
        cellWidth: 'auto',
        halign: 'left'
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      footStyles: {
        fontSize: 15,
      },

      didDrawPage: function (data) {
        // Header (left, top)
        var img = new Image()
        img.src = 'assets/vendors/images/deskappp.png'
        doc.addImage(img, 'png', 56, 5, 99, 22) //(l,t,w,h )
        doc.setFontSize(15)
        doc.text('42 ซอยรามอินทรา 14 แยก 9 แขวง ท่าแร้ง เขต บางเขน กรุงเทพมหานคร 10220', 50, 30);
        doc.text('โทร. 02-943-5814-5 แฟ็กซ์ 02-943-8201 E-mail: benjawan@envirservice.co.th', 47, 35);
        doc.setFontSize(17)
        doc.text('บริษัท เอ็นไวร์ เซอร์วิส จำกัด', data.settings.margin.left, 44);
        doc.text(cus_date, data.settings.margin.left, 50);
        doc.text(cus_noEm, data.settings.margin.left, 56);
        doc.text(cus_name, 195,44, {align:'right'});
        doc.text(cus_add, 195,50, {align:'right'});
        doc.text(cus_post, 195,56, {align:'right'});

        // Footer
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text('สำหรับลูกค้า (For Customer)', data.settings.margin.left+33, pageHeight - 25)
        doc.text('สำหรับผู้ปฏิบัติงาน (For Operator)', 140, pageHeight - 25, {align:'center'})
        doc.text('........................................................', data.settings.margin.left+30, pageHeight - 12)
        doc.text('........................................................', 140, pageHeight - 12, {align:'center'})
      }
    });
    
    window.open(URL.createObjectURL(doc.output("blob")))
    
    // doc.save('table.pdf')
  }

  bodyRows() {
    var body = []
    for (var j = 0; j < this.em_data.length; j++) {
      body.push({
        no: j + 1,
        sn: this.em_data[j].eq_detail_id,
        eq: this.em_data[j].eq_detail_name,
        catagory: this.em_data[j].category,
        amount: this.em_data[j].amount,
      })
    }
    return body
  }
}
