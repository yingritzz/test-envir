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

  opensweet() {
    Swal.fire({
      title: "เพิ่มอุปกรณ์",
      input: 'text',
      inputPlaceholder: 'ใส่ชื่ออุปกรณืที่นี่',
      confirmButtonColor: '#28a745',
      showCancelButton: true        
  }).then((result) => {
      if (result.value) {
          console.log("Result: " + result.value);
      }
  });

  }
}
