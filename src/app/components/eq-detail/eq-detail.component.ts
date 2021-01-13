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

  eq_dname: any = "Thermo PM 2.5"
  eq_dstatus: any
  eq_dnew: any
  eq_ddata: any = [["200DA200310704", "Thermo PM 2.5", "1", "ว่าง 1"], ["xxxxxxxxxxxxxx", "สาย Thermo PM 2.5", "5", "ว่าง 3"],]
  backendData = [{
    "sn": '200DA200310704',
    "name": 'Thermo PM 2.5',
    "count": '1',
    "status": 'ว่าง 1'
  },
  {
    "sn": '200DA200310704',
    "name": 'Thermo PM 2.5',
    "count": '1',
    "status": 'ว่าง 1'
  }]

  eq_id!: number;
  eq_name!: string;

  editField!: string;
  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.eq_id = this.activatedRoute.snapshot.params["id"];
    this.eq_name = this.activatedRoute.snapshot.params["name"];
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

  async edit_eq_detail(item: any) {
    
    const { value: formValues } = await Swal.fire({
      title: 'แก้ไขรายการอุปกรณ์',
      html:
        '<input id="inputSn" class="form-control" autocomplete="off" value="555" >' +
        '<br>' +
        '<input id="inputName" class="form-control" autocomplete="off" placeholder="ชื่อรายการอุปกรณ์">' +
        '<br>' +
        '<input id="inputCount" class="form-control" autocomplete="off" placeholder="จำนวนอุปกรณ์">' +
        '<br>' +
        '<input id="inputCount" class="form-control" autocomplete="off" placeholder="สถานะอุปกรณ์">',
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
      this.eq_dnew = formValues;
      (this.eq_ddata).push(this.eq_dnew)
      Swal.fire('บันทึกสำเร็จ',
        '',
        'success')
        console.log(item)
    }
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.backendData[id] = editField;
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}
