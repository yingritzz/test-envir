import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import { EmploymentDetail, EmploymentDetailEdit } from '../../models/employment';
import { EquipmentAmount } from '../../models/equipment'
import Swal from 'sweetalert2';
import { latLng, MapOptions, tileLayer, Map, Marker, icon } from 'leaflet';
import * as L from 'leaflet';

declare var province_geojson: any;

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  statusArray: string[] = [];
  jobEdit: any = []
  id: any;
  rentals: string[] = ["รับงาน", "กำลังเช่า-ยืม", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ"];
  testing: string[] = ["รับงาน", "กำลังทดสอบ", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ"];
  maintenanc: string[] = ["รับงาน", "กำลังซ่อมบำรุง", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ"];
  selling: string[] = ["รับงาน", "กำลังจำหน่าย", "ส่งของให้ลูกค้า", "ลูกค้ารับสินค้า", "สำเร็จ "];
  jobUpdate: EmploymentDetail;
  status_select: any = []
  status_list: any = []
  id_list: any;
  status: EmploymentDetailEdit;
  amount!: EquipmentAmount;
  emd_edit: any = [];
  emd_id: any;

  mapOptions!: MapOptions;
  private mapp!: Map;
  coor_lat: any;
  coor_lng: any;

  constructor(
    private location: Location,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService) {
    this.jobEdit = [];
    this.jobUpdate = new EmploymentDetail();
    this.status = new EmploymentDetailEdit();
    this.amount = new EquipmentAmount;
  }

  ngOnInit(): void {
    this.initMap();
    this.id = this.activatedRoute.snapshot.params["id"];
    this.getJobEdit();
  }

  private initMap() {
    this.mapp = L.map('map').setView([13.100, 100.100], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapp);
    L.geoJSON(province_geojson).addTo(this.mapp)
  }
  async getIdEmd(id: any) {
    this.emd_id = id;
    this.apiService.emDetail(id).then((res: any) => {
      this.emd_edit = res[0];
      this.status_select = res[0].status
      if (res[0].status == 'สำเร็จ') {
        // (<HTMLInputElement>document.getElementById("status")).disabled = true;
      }
    });
  }
  getJobEdit() {
    this.apiService.getEmploymentDetail(this.id).then((res: any) => {
      this.getData(res);
      console.log(res[0].lat);
      console.log(res[0].long)
      if(res!=null) {
        const marker = new Marker([13.00, 100.000])
          .setIcon(
            icon({
              iconSize: [25, 25],
              iconAnchor: [13, 41],
              iconUrl: 'assets/src/images/marker-icon.png',
              popupAnchor:  [0, -20]
            }));
        marker.addTo(this.mapp).bindPopup(res[0].place);
      }
    });
  }
  statusChange(status: any) {
    if (status == "เช่า-ยืม") {
      this.statusArray = this.rentals;

    } else if (status == "ซ่อมบำรุง") {
      this.statusArray = this.maintenanc;

    } else if (status == "ทดสอบ") {
      this.statusArray = this.testing;

    } else if (status == "จำหน่าย") {
      this.statusArray = this.selling;
    }
  }
  updateStatus(id: any, status: string) {
    this.status_list = status;
    this.id_list = id
  }

  onClickBack() {
    this.location.back();
  }

  getData(data: any) {
    this.jobEdit = data;
  }

  onClickSave(id: any, eqd_id: any, amount: any) {
    this.status.status = this.status_list
    this.apiService.updateEmd(parseInt(this.id_list), this.status).then((res: any) => {
      this.getJobEdit()
      if (this.status_list == "สำเร็จ") {
        this.amount.amount = amount
        this.amount.eqd = eqd_id
        this.apiService.updateEqStatusSuccess(this.id, this.amount).then((res: any) => {
        });
      }
    });
  }

  delete(id: any, name: any, em_id: any, amount: number, eqd_id: any) {
    this.amount = new EquipmentAmount;
    this.amount.eqd = eqd_id;
    this.amount.amount = amount;
    this.apiService.updateEqStatusSuccess(em_id, this.amount).then((res: any) => {
    });
    if (this.jobEdit.length == 1) {
      Swal.fire({
        title: 'ยืนยันการลบ',
        html: 'รายการนี้เป็นรายการสุดท้ายของใบเสร็จ'+'<br>'+ 'คุณต้องการลบ '+ name + 'และใบเสร็จเลขที่' + em_id,
        showDenyButton: true,
        confirmButtonText: `ใช่`,
        denyButtonText: `ไม่ใช่`,
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteEm(em_id).then((res: any) => {
            Swal.fire('ลบสำเร็จ!', '', 'success')
          });
          this.router.navigate(['/home']);
        }
      })
    } else {
      Swal.fire({
        title: 'ยืนยันการลบ',
        html: name + '<br>' + 'จากใบเสร็จเลขที่ ' + id,
        showDenyButton: true,
        confirmButtonText: `ใช่`,
        denyButtonText: `ไม่ใช่`,
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteEmployment(parseInt(id)).then((res: any) => {
            this.getJobEdit();
          });
          Swal.fire('ลบสำเร็จ!', '', 'success')
        }
      })
    }
  }
}
