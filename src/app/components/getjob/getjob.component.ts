import { Component, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer';


@Component({
  selector: 'app-getjob',
  templateUrl: './getjob.component.html',
  styleUrls: ['./getjob.component.css']
})
export class GetjobComponent implements OnInit {

  eq = [" ", "CO2", "NOx", "NOxCO2"];
  cg = [" ", "เช่า-ยืม", "จำหน่าย", "ทดลอง", "ซ่อมบำรุง"]
  add_eqdata: any
  add_eqdetail: any
  catagory_select: any
  equipment_select: any
  count_select: any
  add_data = []
  getJob_data = [["เช่า-ยืม", "CO2", "1"], ["เช่า-ยืม", "O2", "1"], ["เช่า-ยืม", "NOx", "1"]]

  cus_select: any;
  cus_list: any = [];
  email: any;
  phone: any;
  address: any;

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
  }

  ngOnInit(): void {
  
  }

  async getAllCustomers() {
    this.apiService.getListCustomers().then((res: any) => {
      this.cus_list = res;
    });
  }

  show_item(data: any){
    this.cus_list=[];
    console.log(data);
    this.email = data.cus_email;
    this.phone = data.cus_phone;
    this.address = data.number +" ม." + data.moo +" " + data.sub_district +" " + data.district + " " + data.province + " " + data.postal_code;
    this.cus_select = data.cus_name;
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

      this.add_eqdata = formValues;

      const { value: formValuesD } = await Swal.fire({
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
      if (formValuesD) {
        console.log("Resule: " + formValuesD[0] + " : " + formValuesD[1] + " : " + formValuesD[2] + " : " + formValuesD[3]);

        (this.eq).push(formValuesD[1]);
        this.add_eqdetail = formValues;
        Swal.fire('บันทึกสำเร็จ',
          '',
          'success')
      }
    }
  }

  add_getJob() {
    (this.getJob_data).push([this.catagory_select, this.equipment_select, this.count_select]);

  }

  deleteRow(data: any) {
    const index = this.getJob_data.indexOf(data);
    this.getJob_data.splice(index, 1);
  }
}
