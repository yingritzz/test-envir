import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-line-customer',
  templateUrl: './line-customer.component.html',
  styleUrls: ['./line-customer.component.css']
})
export class LineCustomerComponent implements OnInit {

  isDisplay = false;
  isDisplay2 = true;

  //customer
  customerDataList: any;
  cus_id: any;

  //customer profile

  constructor(public apiService: ApiService) { 
    this.customerDataList = [];
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  onClickBack() {
    this.isDisplay = false;
    this.isDisplay2 = true;

    this.isDisplay = this.isDisplay;
    this.isDisplay2 = this.isDisplay2;
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
  }
}
