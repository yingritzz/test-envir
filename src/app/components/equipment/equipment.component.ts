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

  eq_count: any = 99;
  eq_new: Equipment;
  eq_data: any;

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
    this.apiService.getListEq().then((res: any) => {
      // console.log(res);
      this.eq_data = res;
    });
  }

  onClickDetail(id:number, name:string) {
    this.router.navigateByUrl('equipment/detail/'+id+'/'+name)
  }

  delete(id: number) {
    //Delete item in Student data
    this.apiService.deleteEq(id).then((res: any) => {
      this.getAllEquipments();
    });
  }

  async opensweet() {
    const { value: formValues } = await Swal.fire({
      title: 'เพิ่มอุปกรณ์',
      html:
        '<input id="inputName" class="form-control" autocomplete="off" placeholder="ชื่ออุปกรณ์" required="required">' +
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
      // console.log("Resule: " + formValues[0] + " : " + formValues[1]);
      this.eq_new.eq_name = formValues[0];
      this.eq_new.category = formValues[1];
      this.apiService.createEq(this.eq_new).then((res: any) => {
        // console.log('created Eq');
        this.getAllEquipments()
      }); 

      Swal.fire('บันทึกสำเร็จ',
        '',
        'success')
    }
  }

}
