import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../models/customer';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cus-profile',
  templateUrl: './cus-profile.component.html',
  styleUrls: ['./cus-profile.component.css']
})
export class CusProfileComponent implements OnInit {

  id!: number;
  cusData: any;
  cusEdit!: Customer;
  cus: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService,
    public router: Router
  ) {
    this.cusData = [];
    this.cusEdit = new Customer();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.getCustomer();

  }

  getCustomer() {
    //get item details using id
    this.apiService.getCustomer(this.id).subscribe(response => {
      this.cusData = response;
      // console.log(this.cusData);
      // console.log(this.cusEdit);
    })

  }

  delete(item: any) {
    //Delete item in Student data
    this.apiService.deleteCustomer(item.cus_id).subscribe(Response => {
      //Update list after delete is successful
    });
    this.refreshCustomers();
    this.router.navigate(['customer']);
    console.log('delete : ' + item.cus_id);
  }

  update() {
    this.apiService.updateCustomer(this.id, this.cusEdit).subscribe(response => {
    })
    console.log(this.cusEdit);
    this.getCustomer();
    window.location.reload();
  }

  refreshCustomers() {
    this.apiService.getListCustomers().subscribe
      (response => {
        this.cus = response;
        console.log("refreshCustomers");
      })
  }

}
