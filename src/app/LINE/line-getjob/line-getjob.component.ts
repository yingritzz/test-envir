import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { Router } from '@angular/router';
import { EquipmentDetail, EquipmentAmount } from '../../models/equipment';
import { Employment, EmploymentDetail } from '../../models/employment';
import { SearchCustomer } from '../../models/customer'
import { DatePipe } from '@angular/common'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { latLng, MapOptions, tileLayer, Map, Marker, icon } from 'leaflet';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

declare var province_geojson: any;
const myIcon = L.icon({
  iconUrl: 'assets/src/images/marker-icon.png',
  iconSize: [40, 45],
});
const provider = new OpenStreetMapProvider();
const searchControl = new GeoSearchControl({
  provider: provider,
  style: 'bar',
  searchLabel: 'search for address...',
  autoComplete: true,
  autoCompleteDelay: 250,
  showMarker: true,
  marker: {
    icon: myIcon,
    draggable: true,
    autoPan: true
  },
  maxMarkers: 1,
  animateZoom: true,
  keepResult: true,
  autoClose: true,
  zoomLevel: 12,
  showPopup: true,
  popupFormat: ({ query, result }) => result.label,
})

@Component({
  selector: 'app-line-getjob',
  templateUrl: './line-getjob.component.html',
  styleUrls: ['./line-getjob.component.css']
})
export class LineGetjobComponent implements OnInit {

  mapOptions!: MapOptions;
  private map!: Map;
  coor_lat: any;
  coor_lng: any;
  coor_place: any;
  searchss: any;
  drag: any;

  eq = ["ตรวจวัดคุณภาพอากาศ", "ตรวจวัดระดับเสียง", "ตรวจวัดความสั่นสะเทือน", "ตรวจวัดคุณภาพน้ำ"];
  cg = ["เช่า-ยืม", "จำหน่าย", "ทดสอบ", "ซ่อมบำรุง"]
  datepipe = new DatePipe('en-US');
  minDate = new DatePipe('en-US').transform(Date.now(), 'yyyy-MM-dd');
  form!: FormGroup;
  formArray: any = [];
  em_id: any;
  cus_search!: SearchCustomer;

  cus_select: any;  //ng-model
  cus_list: any = [];  //data of api get customer list
  eq_list: any = [];  //data of api get eq id เลือกชนิดตอนสร้างอุปกรณ์
  eqd_list: any = [];  //data of api get eqd เลือกอุปกรณ์
  eqd_new!: EquipmentDetail;  //create eqd
  options: any = [];

  cus_id: any;
  admin_id: any;
  annotation: string = " ";
  annot: string = " ";
  job: Employment;
  job_detail: EmploymentDetail;
  eq_amount!: EquipmentAmount;

  constructor(
    public router: Router,
    public apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.eqd_new = new EquipmentDetail;
    this.job = new Employment;
    this.job_detail = new EmploymentDetail;
    this.eq_amount = new EquipmentAmount;
    this.cus_search = new SearchCustomer;
  }

  ngOnInit(): void {
    this.admin_id = 1;
    this.getAllEq();
    this.getAllEqd();
    this.initMap();
    (document.getElementById('dateEnd') as HTMLInputElement).setAttribute("min", this.minDate!);
    (document.getElementById('save') as HTMLInputElement).disabled = true;
    this.form = this.formBuilder.group({
      category: [null, Validators.required],
      eq_detail_id: [null, Validators.required],
      date_get_job: [null],
      date_end_job: [null, Validators.required],
      amount: [null, Validators.required],
      status: [null],
      em_id: [null],
      eq_detail_name: [null]
    });
  }

  async getCustomers(item: any) {
    if (item != "") {
      this.cus_search.text = item;
      this.apiService.searchCus(this.cus_search).then((res: any) => {
        this.getData(res);
      });
    } else {
      this.cus_list = []
    }
  }
  getData(data: any) {
    this.cus_list = data;
  }
  show_cus(data: any) {
    this.cus_id = data.id;
    this.cus_select = data.cus_fullname;
    this.cus_list = []
  }
  async getAllEq() {
    this.apiService.getListEq().then((res: any) => {
      this.eq_list = res;
    });
  }
  async getAllEqd() {
    this.eqd_list = [];
    this.apiService.getListEqd().then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].eq_detail_status != 'ไม่ว่าง') {
          this.eqd_list.push(res[i]);
        }
        for (let i = 0; i < this.eqd_list.length; i++) {
          this.options[i] = { value: this.eqd_list[i].id, selected: false }
        }
      }
    });
  }
  async create_eqd() {
    this.eqd_new.eq_detail_status = "ว่าง ";
    if (this.eqd_new.eq_id != undefined && this.eqd_new.id != undefined && this.eqd_new.eq_detail_name != null && this.eqd_new.eq_detail_amount != undefined) {
      this.apiService.createEqDetail(this.eqd_new).then((res: any) => {
        this.eqd_list.push(res[0]);
      });
      this.eqd_new = new EquipmentDetail();
    } else {
      Swal.fire("ไม่สามารถเพิ่มรายการอุปกรณ์ได้", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }
  }

  private initMap() {
    this.map = L.map('map').setView([13.100, 100.100], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.geoJSON(province_geojson).addTo(this.map);
    this.map.addControl(searchControl);

    this.map.on('geosearch/showlocation', x => {
      this.searchss = x
      this.getCoor(this.searchss.location.raw.lat, this.searchss.location.raw.lon, this.searchss.location.raw.display_name);
    });

    this.map.on('geosearch/marker/dragend', y => {
      this.drag = y;
      this.getCoor(this.drag.location.lat, this.drag.location.lng, this.searchss.location.raw.display_name);
    });
  }
  getCoor(lat: any, lng: any, place: any) {
    this.coor_lat = lat;
    this.coor_lng = lng;
    this.coor_place = place;
    // console.log('lat : '+ this.coor_lat)
    // console.log('lng : '+this.coor_lng)
    // console.log('place : '+this.coor_place)
  }

  async add_getJob() {
    this.form.value.date_get_job = this.minDate;
    this.form.value.status = 'รับงาน'
    this.annot = this.annotation;
    (document.getElementById('save') as HTMLInputElement).disabled = false;

    if (this.form.valid) {
      this.apiService.getEqd(this.form.value.eq_detail_id).then((res: any) => {
        if (this.form.value.amount <= res[0].eq_detail_amount) {
          this.form.value.eq_detail_name = res[0].eq_detail_name;
          this.form.value.date_end = this.datepipe.transform(this.form.value.date_end_job, 'dd MMM yyyy')
          this.formArray.push(this.form.value);
          this.form.reset();
          Swal.fire("เพิ่มงานสำเร็จ!", 'สามารถตรวจสอบรายละเอียดความถูกต้องของงาน' + '<br>' + 'ได้ที่ตารางด้านล่าง', "success");
        } else {
          Swal.fire("จำนวนอุปกรณ์ไม่เพียงพอ", res[0].eq_detail_name + " คงเหลือ " + res[0].eq_detail_amount, "warning");
        }
      });
    } else {
      Swal.fire("ไม่สามารถเพิ่มรายการได้", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }

    for (let i = 0; i < this.eqd_list.length; i++) {
      if (this.form.value.eq_detail_id == this.eqd_list[i].id) {
        this.eqd_list.splice(i, 1);
      }
    }
  }

  filterUsers() {
    let filterUsers = this.options.filter((item: { value: any; }) => item.value === this.form.value.eq_detail_id);
    if (filterUsers.length > 0) {
      this.options = filterUsers;
    }
  }
  deleteRow(i: number) {
    this.apiService.getEqd(this.formArray[i].eq_detail_id).then((res: any) => {
      this.eqd_list.push(res[0]);
    });
    this.formArray.splice(i, 1);
  }

  save() {
    if (this.cus_id == null || this.cus_id == undefined) {
      Swal.fire("ไม่สามารถบันทึกรายการได้", "กรุณากรอกข้อมูลลูกค้าให้ครบถ้วน", "error");
    } else {
      (this.job).admin_id = parseInt(this.admin_id);
      (this.job).cus_id = parseInt(this.cus_id);
      (this.job).annotation = this.annot;
      (this.job).lat = this.coor_lat;
      (this.job).long = this.coor_lng;
      (this.job).place = this.coor_place;

      this.apiService.createEmployment(this.job).then((res: any) => {
        this.em_id = res[0].lastval;
        for (let i = 0; i < this.formArray.length; i++) {
          this.formArray[i].em_id = res[0].lastval;
          this.apiService.createEmDetail(this.formArray[i]).then((response: any) => {
            (this.eq_amount).amount = parseInt(this.formArray[i].amount);
            (this.eq_amount).eqd = this.formArray[i].eq_detail_id;
            this.apiService.updateEqStatus(this.formArray[i].em_id, this.eq_amount).then((resp: any) => {
              // console.log(this.formArray[i].em_id);
            });
          });
        }
        this.router.navigate(['/line/home']);
      });
    }
  }

  isFieldValid(field: string) {
    return this.form.get(field)!.valid && this.form.get(field)!.touched;
  }
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

}
