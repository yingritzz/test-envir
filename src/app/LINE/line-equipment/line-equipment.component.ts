import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-line-equipment',
  templateUrl: './line-equipment.component.html',
  styleUrls: ['./line-equipment.component.css']
})
export class LineEquipmentComponent implements OnInit {

  eq_name: any = "Thermo PM 2.5"
  eq_count: any = 99
  eq_catagory: any = "วัดคุณภาพอากาศ"
  eq_new: any
  eq_data: any = [["Analyzer O3", "วัดคุณภาพอากาศ"], ["Analyzer SO2", "วัดคุณภาพอากาศ"], ["Thermo PM 2.5", "วัดคุณภาพอากาศ"]]
  
  eq_dname: any = "Thermo PM 2.5"
  eq_dstatus: any
  eq_dnew: any
  eq_ddata: any = [["200DA200310704", "Thermo PM 2.5", "1", "ว่าง 1"], ["xxxxxxxxxxxxxx", "สาย Thermo PM 2.5", "5", "ว่าง 3"]]

  isDisplay1 = true;
  isDisplay2 = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDisplay(){
    this.isDisplay1 = !this.isDisplay1;
    this.isDisplay2 = !this.isDisplay2;
  }

  onClickBack() {
    this.isDisplay1 = true;
    this.isDisplay2 = false;

    this.isDisplay1 = this.isDisplay1;
    this.isDisplay2 = this.isDisplay2;
  }

  async opensweet() {
    const { value: formValues } = await Swal.fire({
      title: 'เพิ่มอุปกรณ์',
      html:
        '<input id="inputName" class="form-control" autocomplete="off" placeholder="ชื่ออุปกรณ์">' +
        '<br>' +
        '<select id="inputCat" class="custom-select form-control btn dropdown-toggle ">' +
        '<option value="">เลือกหมวดหมู่อุปกรณ์</option>' +
        '<option value="ตรวจวัดคุณภาพอากาศ">ตรวจวัดคุณภาพอากาศ</option>' +
        '<option value="ตรวจวัดระดับเสียง">ตรวจวัดระดับเสียง</option>' +
        '<option value="ตรวจวัดความสั่นสะเทือน">ตรวจวัดความสั่นสะเทือน</option>' +
        '<option value="ตรวจวัดคุณภาพน้ำ">ตรวจวัดคุณภาพน้ำ</option>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          (document.getElementById('inputName') as HTMLTextAreaElement).value,
          (document.getElementById('inputCat') as HTMLTextAreaElement).value
        ]
      }
    })
    if (formValues) {
      console.log("Resule: " + formValues[0] + " : " + formValues[1]);

      this.eq_new = formValues;
      (this.eq_data).push(this.eq_new)
      Swal.fire('บันทึกสำเร็จ',
        '',
        'success')
      console.log(this.eq_data)
    }
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
