import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-cus-profile',
  templateUrl: './cus-profile.component.html',
  styleUrls: ['./cus-profile.component.css']
})
export class CusProfileComponent implements OnInit {

  id!: number;
  customerData: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService
  ) { 
    this.customerData = [];
  }

  ngOnInit(): void {
    this.getCustomer(this.id)
  }

  getCustomer(id:number) {
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getCustomer(this.id).subscribe(response => {
      console.log(response);
      this.customerData = response;
    })
  }

}
