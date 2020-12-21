import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  eq_name: any = "Thermo PM 2.5"
  eq_count: any = 99
  eq_catagory: any = "วัดคุณภาพอากาศ"
  eq_new: any
  eq_data: any = [["a", "lalala"], ["b", "hahaha"]]
  constructor(public route: Router) { }

  ngOnInit(): void {
  }

  async onClickHome() {
    this.route.navigateByUrl('home')
  }
  onClickDetail() {
    this.route.navigateByUrl('equipment/detail')
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


}
