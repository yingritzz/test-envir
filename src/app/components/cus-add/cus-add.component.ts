import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cus-add',
  templateUrl: './cus-add.component.html',
  styleUrls: ['./cus-add.component.css']
})
export class CusAddComponent implements OnInit {

  data: Customer;
  cus: any;

  constructor(
    private location: Location,
    public apiService: ApiService,
    public router: Router
  ) {
    this.data = new Customer();
  }

  ngOnInit(): void {
  }

  onClickBack() {
    this.location.back();
  }
  
  onClickNewCus() {
    this.apiService.createCustomer(this.data).then((res: any) => {
      console.log(this.data);
      this.router.navigate(['customer']);
    }); 
  }
}
