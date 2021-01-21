import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service';
import { EquipmentDetail } from '../../models/equipment-detail';

@Component({
  selector: 'app-eq-detail',
  templateUrl: './eq-detail.component.html',
  styleUrls: ['./eq-detail.component.css']
})
export class EqDetailComponent implements OnInit {

  eq_id!: number;
  eq_name!: string;
  eqd_data: any;
  eqd_new: EquipmentDetail;
  eqd_edit: EquipmentDetail;
  eqd_id: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService
  ) {
    this.eqd_data = [];
    this.eqd_new = new EquipmentDetail();
    this.eqd_edit = new EquipmentDetail();
  }

  ngOnInit(): void {
    this.eq_id = this.activatedRoute.snapshot.params["id"];
    this.eq_name = this.activatedRoute.snapshot.params["name"];
    this.getEqDetail();
  }

  async getIdEqd(id: any) {
    this.eqd_id = id;
    this.apiService.getEqd(id).then((res: any) => {
      //  console.log(res);
      this.eqd_edit = res[0];
    });
  }

  getEqDetail() {
    this.apiService.getEqDetail(this.eq_id).then((res: any) => {
      // console.log(res);
      this.eqd_data = res;
    });
  }

  delete(id: any, index: number) {
    Swal.fire({
      title: 'คุณต้องการลบอุปกรณ์ ' + this.eqd_data[index].id + ' : ' + this.eqd_data[index].eq_detail_name + ' ใช่หรือไม่?',
      showDenyButton: true,
      confirmButtonText: `ใช่`,
      denyButtonText: `ไม่ใช่`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteEqDetail(id).then((res: any) => {
          this.getEqDetail();
        });
        Swal.fire('ลบสำเร็จ!', '', 'success')
      }
    })

  }

  async edit_eqd() {
    this.apiService.updateEqDetail(this.eqd_id, this.eqd_edit).then((res: any) => {
      this.getEqDetail()
      // console.log(this.eqd_id);
      // console.log(this.eqd_edit);
    });
    this.eqd_edit = new EquipmentDetail();
  }

  async insert_eq_detail() {
    const { value: formValues } = await Swal.fire({
      title: 'เพิ่มรายการอุปกรณ์',
      html:
        '<input id="inputSn" class="form-control" autocomplete="off" placeholder="SN no." type="text">' +
        '<br>' +
        '<input id="inputName" class="form-control" autocomplete="off" placeholder="ชื่อรายการอุปกรณ์" type="text">' +
        '<br>' +
        '<input id="inputCount" class="form-control" autocomplete="off" placeholder="จำนวนอุปกรณ์" type="number">' +
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
      this.eqd_new.id = formValues[0];
      this.eqd_new.eq_detail_name = formValues[1];
      this.eqd_new.eq_detail_amount = parseInt(formValues[2]);
      this.eqd_new.eq_detail_status = formValues[3];
      this.eqd_new.eq_id = this.eq_id;
      this.apiService.createEqDetail(this.eqd_new).then((res: any) => {
        // console.log('created Eq');
        this.getEqDetail()
      });
      Swal.fire('บันทึกสำเร็จ',
        '',
        'success')

    }
  }
}
