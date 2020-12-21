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
    //   Swal.fire({
    //     title: "เพิ่มอุปกรณ์",
    //     input: 'text',
    //     inputPlaceholder: 'ใส่ชื่ออุปกรณืที่นี่',
    //     confirmButtonColor: '#28a745',
    //     showCancelButton: true        
    // }).then((result) => {
    //     if (result.value) {
    //         console.log("Result: " + result.value);
    //     }
    // });

    const { value: formValues } = await Swal.fire({
      title: 'เพิ่มอุปกรณ์',
      html:
        '<input id="inputName" class="swal2-input" placeholder="ชื่ออุปกรณ์">'+
        '<select id="inputCat" class="custom-select form-control">'+
        '<option value="">เลือกหมวดหมู่อุปกรณ์</option>'+
        '<option value="air">ตรวจวัดคุณภาพอากาศ</option>'+
        '<option value="sound">ตรวจวัดระดับเสียง</option>'+
        '<option value="vibrate">ตรวจวัดความสั่นสะเทือน</option>'+
        '<option value="water">ตรวจวัดคุณภาพน้ำ</option>',

        // '<input id="inputCat" class="swal2-input" placeholder="หมวดหมู่อุปกรณ์">'
      // input: 'select',
      // inputOptions: {
      //   'air': 'ตรวจวัดคุณภาพอากาศ',
      //   'sound': 'ตรวจวัดระดับเสียง',
      //   'vibrate': 'ตรวจวัดความสั่นสะเทือน',
      //   'water': 'ตรวจวัดคุณภาพน้ำ'
      // },
      // inputPlaceholder: 'เลือกหมวดหมู่อุปกรณ์',
      focusConfirm: false,
      // inputValidator: (value) => {
      //   return new Promise((resolve) => {
      //     if (value != null) {
      //       console.log(value);
      //     }
      //   })
      // },
      preConfirm: () => {
        return [
          (document.getElementById('inputName') as HTMLTextAreaElement).value +
           (document.getElementById('inputCat') as HTMLTextAreaElement).value,
        ]
      }
    })

    if (formValues) {
      // Swal.fire(JSON.stringify(formValues))
      console.log("Resule: " + formValues[0]);
      Swal.fire('บันทึกสำเร็จ',
      '',
      'success')
    }

  }
}
