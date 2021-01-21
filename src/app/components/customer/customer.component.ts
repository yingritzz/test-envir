import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerDataList: any;


  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.customerDataList = [];
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.apiService.getListCustomers().then((res: any) => {
      // console.log(res);
      this.customerDataList = res;
    });
  }

  onClick(id: number) {
    this.router.navigate(['customer/profile/' + id]);
  }

}
