import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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
    this.apiService.getListCustomers().subscribe(response => {
      // console.log(response);
      this.customerDataList = response;
    })
  }

  onClick(id: number){
    this.router.navigate(['customer/profile/'+id]);
  }

  
}
