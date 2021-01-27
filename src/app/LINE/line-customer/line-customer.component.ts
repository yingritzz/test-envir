import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-line-customer',
  templateUrl: './line-customer.component.html',
  styleUrls: ['./line-customer.component.css']
})
export class LineCustomerComponent implements OnInit {

  isDisplay = false;
  isDisplay2 = true;
  isDisplay3 = false;

  //Add customer
  data: Customer;
  cusAdd: any;

  //customer
  customerDataList: any;
  cus_id: any;

  //customer profile 
  id!: number;
  cusEdit: Customer;
  cusData: any;
  cus: any;
  cusProfile: any = [];
  rental: any = [];
  testing: any = [];
  maintenanc: any = [];
  selling: any = [];
  date_rental: any = [];
  date_testing: any = [];
  date_maintenanc: any = [];
  date_selling: any = [];
  moo: any;
  soi: any;
  road: any;
  address: any;


  constructor(public apiService: ApiService) { 

    this.customerDataList = [];
    this.cusEdit = new Customer();
    this.data = new Customer();

  }

  ngOnInit(): void {
    this.getAllCustomers();
    
  }
  //customer
  getAllCustomers() {
    this.apiService.getListCustomers().then((res: any) => {
      // console.log(res);
      this.customerDataList = res;
    });
  }
  onClickmore(id: any) {
    this.cus_id = id;
    this.isDisplay = !this.isDisplay;
    this.isDisplay2 = !this.isDisplay2;
    this.getCustomer();
    this.profile();
  }

  clickAddcustomer(){
    this.isDisplay3 = !this.isDisplay3;
    this.isDisplay = this.isDisplay;
    this.isDisplay2 = !this.isDisplay2;
  }

  //customer profile
  getCustomer() {
    this.apiService.getCustomer(this.cus_id).then((res: any) => {
      this.getData(res);
    
      if (res[0].moo == null) {
        this.moo=""
      } else {
        this.moo = " ม."+res[0].moo;
      }
      if (res[0].soi == null || res[0].soi == "") {
        this.soi=""
      }else {
        this.soi = "ซอย"+res[0].soi;
      }
      if (res[0].road == null || res[0].road == "") {
        this.road=""
      }else {
        this.road = "ถนน"+res[0].road;
      }
      this.address = res[0].number + this.moo + " " +this.soi + " " +this.road + " " + res[0].sub_district + " " + res[0].district + " " + res[0].province + " " + res[0].postal_code;
      this.cusEdit = res[0]

    });
  }

  getData(data: any) {
    this.cusData=data;
  }

  profile(){
    this.apiService.customerProfile(this.cus_id).then((res: any) => {
      // console.log('customerList : ' + res);
      this.cusProfile = res;
      for (let i = 0; i < this.cusProfile.length; i++) {
        if (this.cusProfile[i].category == 'เช่า-ยืม'){
            this.rental.push(this.cusProfile[i].eq_detail_name);
        }
        else if (this.cusProfile[i].category == 'ทดสอบ'){
          this.testing.push(this.cusProfile[i].eq_detail_name);
      }
      else if (this.cusProfile[i].category == 'ซ่อมบำรุง'){
        this.maintenanc.push(this.cusProfile[i].eq_detail_name);
    }
    else if (this.cusProfile[i].category == 'จำหน่าย'){
      this.selling.push(this.cusProfile[i].eq_detail_name);

  }
      }
    });
  }

  onClickBack() {
    this.isDisplay = false;
    this.isDisplay2 = true;
    this.isDisplay = this.isDisplay;
    this.isDisplay2 = this.isDisplay2;
    this.rental = [];
    this.selling = [];
    this.maintenanc = [];
    this.testing = [];
  }

  //Add customer

  onClickNewCus() {

    if (this.data.moo == undefined) {
      this.data.moo = "null" ;
    }
    if (this.data.soi == undefined) {
      this.data.soi = ""
    }
    if (this.data.road == undefined) {
      this.data.road = "" ;
    }
    this.apiService.createCustomer(this.data).then((res: any) => {
      // console.log(this.data);
      // console.log('created!!');
      // this.router.navigate(['customer']);
      this.getAllCustomers();
    }); 

    this.isDisplay = false;
    this.isDisplay2 = true;
    this.isDisplay3 = false;
    this.isDisplay = this.isDisplay;
    this.isDisplay2 = this.isDisplay2;
    this.isDisplay3 = this.isDisplay3;
  }
  onClickBackTocustomer() {
    this.isDisplay = false;
    this.isDisplay2 = true;
    this.isDisplay3 = false;
    this.isDisplay = this.isDisplay;
    this.isDisplay2 = this.isDisplay2;
    this.isDisplay3 = this.isDisplay3;
  }
}
