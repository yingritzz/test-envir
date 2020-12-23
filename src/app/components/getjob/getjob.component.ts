import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-getjob',
  templateUrl: './getjob.component.html',
  styleUrls: ['./getjob.component.css']
})
export class GetjobComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  async add_eq() {
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

      // this.eq_new = formValues;
      // (this.eq_data).push(this.eq_new)
      // Swal.fire('บันทึกสำเร็จ',
      //   '',
      //   'success')
      // console.log(this.eq_data)
    }
  }

}
