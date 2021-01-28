import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service';
import { Equipment } from '../../models/equipment';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  eq_count: any;
  eq_new: Equipment;
  eq_data: any;

  page = 1;
  count = 0;
  tableSize = 15;

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.eq_data = [];
    this.eq_new = new Equipment();
  }

  ngOnInit(): void {
    this.getAllEquipments();

  }

  getAllEquipments() {
    this.eq_count = [];
    this.apiService.getListEq().then((res: any) => {
      // console.log(res);
      this.getData(res);
      for (let x = 0; x < res.length; x++) {
        this.apiService.getEqDetail(res[x].id).then((response: any) => {
          this.eq_count.push(response.length)
          // console.log(this.eq_count);
        });
      }

    });
  }

  getData(data: any) {
    this.eq_data = data
  }

  onClickDetail(id: number, name: string) {
    this.router.navigateByUrl('equipment/detail/' + id + '/' + name)
  }

  delete(id: number, name: any) {
    Swal.fire({
      title: 'ยืนยันการลบอุปกรณ์',
      text: name,
      showDenyButton: true,
      confirmButtonText: `ใช่`,
      denyButtonText: `ไม่ใช่`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteEq(id).then((res: any) => {
          this.getAllEquipments();
        });
        Swal.fire('ลบสำเร็จ!', '', 'success')
      }
    })
  }

  async add_eq() {
    const { value: formValues } = await Swal.fire({
      title: 'เพิ่มอุปกรณ์',
      html:
        '<form>' +
        '<input id="inputName" class="form-control" autocomplete="off" placeholder="ชื่ออุปกรณ์" required>' +
        '<br>' +
        '<select id="inputCat" class="custom-select form-control btn dropdown-toggle " required>' +
        '<option value="">เลือกหมวดหมู่อุปกรณ์</option>' +
        '<option value="ตรวจวัดคุณภาพอากาศ">ตรวจวัดคุณภาพอากาศ</option>' +
        '<option value="ตรวจวัดระดับเสียง">ตรวจวัดระดับเสียง</option>' +
        '<option value="ตรวจวัดความสั่นสะเทือน">ตรวจวัดความสั่นสะเทือน</option>' +
        '<option value="ตรวจวัดคุณภาพน้ำ">ตรวจวัดคุณภาพน้ำ</option>' +
        '</form>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          (document.getElementById('inputName') as HTMLTextAreaElement).value,
          (document.getElementById('inputCat') as HTMLTextAreaElement).value,
        ]
      }
    })
    if (formValues) {
      if (formValues[0]!="" && formValues[1]!="") {
        this.eq_new.eq_name = formValues[0];
        this.eq_new.category = formValues[1];

        this.apiService.createEq(this.eq_new).then((res: any) => {
          this.getAllEquipments()
        });
        Swal.fire('บันทึกสำเร็จ', '', 'success')
      } else {
        Swal.fire("ไม่สามารถเพิ่มอุปกรณ์ได้", "กรุณากรอกข้อมูลให้ครบถ้วน", "error")
      }
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllEquipments();
  }

}
