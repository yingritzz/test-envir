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

  data: Customer

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

  submitNewCus() {
    this.apiService.createCustomer(this.data).subscribe((response) => {
    })
    this.router.navigate(['customer']);
  }


}
