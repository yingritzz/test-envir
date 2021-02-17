import { Component, AfterViewInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service';
import { Equipment, EquipmentDetail } from '../../models/equipment';
import { QuaggaJSResultObject } from '@ericblade/quagga2';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
  selector: 'app-line-equipment',
  templateUrl: './line-equipment.component.html',
  styleUrls: ['./line-equipment.component.css']
})
export class LineEquipmentComponent implements AfterViewInit  {

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue: any 

  //Equipment
  eq_count: any;
  eq_new: Equipment;
  eq_data: any;
  eq_id: any;
  eq_names: any;

  //Equipment Detail
  eqd_data: any;
  eqd_new: EquipmentDetail;
  eqd_edit: EquipmentDetail;
  eqd_id: any;
  
  isDisplay1 = true;
  isDisplay2 = false;
  pageEq = 1;
  pageEqd = 1;
  count = 0;
  tableSize = 10;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService
    
  ) {
    this.eq_data = [];
    this.eq_new = new Equipment();

    this.eqd_data = [];
    this.eqd_new = new EquipmentDetail();
    this.eqd_edit = new EquipmentDetail();

    this.barcodeScanner = new BarcodeScannerLivestreamComponent;

  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.getAllEquipments();
  }

clickScanner(){
  this.barcodeScanner.start();
}

onValueChanges(result: QuaggaJSResultObject): void {
    console.log(result.codeResult.code)
    this.barcodeValue = result.codeResult.code;
}

onStarted(event:any): void {
    console.log('started', event);
}

  onClickBack() {
    this.isDisplay1 = true;
    this.isDisplay2 = false;

    this.isDisplay1 = this.isDisplay1;
    this.isDisplay2 = this.isDisplay2;
  }

  onTableDataChangeEq(event: any) {
    this.pageEq = event;
    this.getAllEquipments();
  }
  onTableDataChangeEqd(event: any) {
    this.pageEqd = event;
    this.getAllEquipments();
  }
  //Equipment
  getAllEquipments() {
    this.eq_count = [];
    this.apiService.getListEq().then((res: any) => {
      for (let x = 0; x < res.length; x++) {
        this.apiService.getEqDetail(res[x].id).then((response: any) => {
          // console.log(res.length)
          res[x].count = response.length
          // console.log(res[x].count);
        });
      }
      this.getData(res);
    });
  }

  addEquip(){

    if (this.eqd_new.id) {
      var sn2 = this.eqd_new.id[0]
      console.log(sn2)
      for (let i = 1; i < this.eqd_new.id.length; i++) {
        if (this.eqd_new.id[i] == '.' || 
        (this.eqd_new.id[i]) == '/' || (this.eqd_new.id[i]) == '^' || 
        (this.eqd_new.id[i])== '*' || (this.eqd_new.id[i]) == '{' ||
        (this.eqd_new.id[i]) == '&' || (this.eqd_new.id[i]) == '}' ||
        (this.eqd_new.id[i])== '$' || (this.eqd_new.id[i]) == '[' ||
        (this.eqd_new.id[i]) == '฿' || (this.eqd_new.id[i]) == ']' ||
        (this.eqd_new.id[i]) == '>' || (this.eqd_new.id[i]) == '(' ||
        (this.eqd_new.id[i]) == '<' || (this.eqd_new.id[i]) == ')' ||
        (this.eqd_new.id[i]) == ',' || (this.eqd_new.id[i]) == ':' || 
        (this.eqd_new.id[i]) == ';' || (this.eqd_new.id[i]) == "'" ||
        (this.eqd_new.id[i]) == '@' || (this.eqd_new.id[i]) == "%" ||
        (this.eqd_new.id[i]) == "!" || (this.eqd_new.id[i]) == "+" ||
        (this.eqd_new.id[i]) == "=" || (this.eqd_new.id[i]) == " ") {
          sn2 = sn2 + '-'
        } else {
          sn2 = sn2 + this.eqd_new.id[i]
        }
      }
    } 
    console.log(this.eqd_new)
    if (this.eqd_new.id!= null || this.eqd_new.eq_detail_name  != null || this.eqd_new.eq_detail_status  != null ) {
        this.eqd_new.eq_detail_status = "ว่าง";
        this.eqd_new.id = sn2
        this.eqd_new.eq_id = this.eq_id;
        
      this.apiService.createEqDetail(this.eqd_new).then((res: any) => {
        this.getEqDetail()
      });
      this.eqd_new = new EquipmentDetail();
    }
    else {
      Swal.fire("ไม่สามารถเพิ่มรายการอุปกรณ์ได้", "กรุณากรอกข้อมูลให้ครบถ้วน", "error")
    }
  }
  getData(data: any) {
    this.eq_data = data
  }
  onClickDetail(id: number, name: string) {
    this.eq_id = id;
    this.eq_names = name;
    this.getEqDetail();
    this.isDisplay1 = !this.isDisplay1;
    this.isDisplay2 = !this.isDisplay2;
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
      this.eq_new.eq_name = formValues[0];
      this.eq_new.category = formValues[1];
      
      this.apiService.createEq(this.eq_new).then((res: any) => {
        this.getAllEquipments()
      });
      Swal.fire('บันทึกสำเร็จ','','success')
    }
  }

  //Equipment Detail
  getEqDetail() {
    this.apiService.getEqDetail(this.eq_id).then((res: any) => {
      this.eqd_data = res;
    });
  }
  deleteEqd(id: any, name: any) {
    Swal.fire({
      title: 'ยืนยันการลบอุปกรณ์',
      text: id + ' : ' + name,
      showDenyButton: true,
      confirmButtonText: `ใช่`,
      denyButtonText: `ไม่ใช่`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteEqDetail(id).then((res: any) => {
          this.getEqDetail();
        });
        Swal.fire('ลบสำเร็จ!', '', 'success')
      }
    })

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
          "ว่าง"
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
        this.getEqDetail()
      });
      Swal.fire('บันทึกสำเร็จ','','success')
    }
  }
}
