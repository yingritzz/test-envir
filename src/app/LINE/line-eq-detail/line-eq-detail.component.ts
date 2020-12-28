import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-line-eq-detail',
  templateUrl: './line-eq-detail.component.html',
  styleUrls: ['./line-eq-detail.component.css']
})
export class LineEqDetailComponent implements OnInit {

  eq_dname: any = "Thermo PM 2.5"
  eq_dstatus: any
  eq_dnew: any
  eq_ddata: any = [["200DA200310704", "Thermo PM 2.5", "1", "ว่าง 1"], ["xxxxxxxxxxxxxx", "สาย Thermo PM 2.5", "5", "ว่าง 3"],]
  constructor(public route: Router) { }

  ngOnInit(): void {
  }

  async insert_eq_detail() {
    const { value: formValues } = await Swal.fire({
      title: 'เพิ่มรายการอุปกรณ์',
      html:
        '<input id="inputSn" class="form-control" autocomplete="off" placeholder="SN no." type="text">' +
        '<br>' +
        '<input id="inputName" class="form-control" autocomplete="off" placeholder="ชื่อรายการอุปกรณ์">' +
        '<br>' +
        '<input id="inputCount" class="form-control" autocomplete="off" placeholder="จำนวนอุปกรณ์">' +
        '<br>' +
        '<label id="textStatus" class="mb-15 text-blue h4">สถานะ : ว่าง</label>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          (document.getElementById('inputSn') as HTMLTextAreaElement).value,
          (document.getElementById('inputName') as HTMLTextAreaElement).value,
          (document.getElementById('inputCount') as HTMLTextAreaElement).value,
          "ว่าง " + (document.getElementById('inputCount') as HTMLTextAreaElement).value
        ]
      }
    })
    if (formValues) {
      // console.log("Resule: " + formValues[0] + " : " + formValues[1] + " : " + formValues[2] + " : " + formValues[3]);

      this.eq_dnew = formValues;
      (this.eq_ddata).push(this.eq_dnew)
      Swal.fire('บันทึกสำเร็จ',
        '',
        'success')
      console.log(this.eq_ddata)
    }
  }

  deleteRow(item: any) {
    const index = this.eq_ddata.indexOf(item);
    this.eq_ddata.splice(index, 1);
  }
}
