import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
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
    //get item details using id
    this.apiService.getCustomer(this.id).subscribe(response => {
      this.cusData = response;
      
      // console.log(this.cusData);
      // console.log(this.cusEdit);
    })
    
  }

  delete(id: number) {
    //Delete item in Student data
    this.apiService.deleteCustomer(id).subscribe(Response => {
    });
    this.router.navigate(['customer']);
    console.log('delete : ' + id);
  }

  update() {
    this.apiService.updateCustomer(this.id, this.cusEdit).subscribe(response => {
    })
    console.log(this.cusEdit);
    window.location.reload();
  }

}
