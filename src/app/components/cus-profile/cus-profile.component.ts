import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-cus-profile',
  templateUrl: './cus-profile.component.html',
  styleUrls: ['./cus-profile.component.css']
})
export class CusProfileComponent implements OnInit {

  id!: number;
  cusEdit: Customer;
  cusData: any;
  cus: any;
  edit: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService,
    public router: Router
  ) {
    this.cusEdit = new Customer();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.apiService.getCustomer(this.id).then((res: any) => {
      this.edit = res;
      this.cusData = res;
    });
  }

  update() {
    this.apiService.updateCustomer(this.id, this.cusEdit).then((res: any) => {
    window.location.reload();
    });
  }

  delete() {
    //Delete item in Student data
    this.apiService.deleteCustomer(this.id).then((res: any) => {
      console.log('deleted '+ this.id);
      this.router.navigate(['customer']);
      this.refreshCustomers();
    });
  }

  refreshCustomers() {
    this.apiService.getListCustomers().then((res: any) => {
      // console.log('customerList : ' + res);
      this.cus = res;
    });
  }

}
