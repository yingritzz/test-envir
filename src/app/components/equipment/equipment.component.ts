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
        '<input id="swal-input1" class="swal2-input" placeholder="ชื่ออุปกรณ์">' +
        '<input id="swal-input2" class="swal2-input" placeholder="หมวดหมู่อุปกรณ์">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1')as HTMLTextAreaElement).value,
          (document.getElementById('swal-input2')as HTMLTextAreaElement).value
        ]
      }
    })

    if (formValues) {
      Swal.fire(JSON.stringify(formValues))
    }

  }
}
